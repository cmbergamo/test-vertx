package com.mbs.main;

import com.mbs.utils.MbsUsuarioCodec;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.MultiMap;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.User;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.handler.TemplateHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;
import io.vertx.ext.web.sstore.SessionStore;
import io.vertx.ext.web.templ.MVELTemplateEngine;

public class VertxPrincipal extends AbstractVerticle {

	private HttpServer hs;

	@Override
	public void start() throws Exception {
		super.start();

		hs = vertx.createHttpServer();

		Router router = Router.router(vertx);

		router.route().handler(BodyHandler.create());

		SessionStore store = LocalSessionStore.create(vertx, "erpSession");

		/*router.route().handler(CookieHandler.create());*/
		SessionHandler sessionHandler = SessionHandler.create(store);
		router.route().handler(sessionHandler);

		router.route("/").handler(_rc -> {
			HttpServerResponse hsr = _rc.response();
			hsr.sendFile("webroot/teste.html");
		});

		router.route("/static/*").handler(StaticHandler.create());

		MVELTemplateEngine mvelEngine = MVELTemplateEngine.create();
		TemplateHandler th = TemplateHandler.create(mvelEngine);
		router.route("/dynamic/*").handler(th);

		EventBus eb = vertx.eventBus();
		eb.registerCodec(new MbsUsuarioCodec());

		router.route("/login.do").handler(_event -> {

			/*JsonObject job = new JsonObject();

			job.put("usuario", _event.request().getParam("usuario"));
			job.put("senha", _event.request().getParam("senha"));

			System.out.println(job);

			eb.send("erp.autenticarcao", job, _resposta -> {

				if (_resposta.succeeded()) {
					_event.setUser((User) _resposta.result().body());
					_event.next();
				} else {
					System.err.println(_resposta.cause());*/
					_event.reroute("/dynamic/pageLogin.templ");
				/*}

			});*/
		});

		/*router.route("/login.do").handler(_event -> {
			_event.response().putHeader("Content-type", "text/plain");
			_event.response().setChunked(true);

			System.out.println(_event.response().write("Finalizou com sucesso!!!"));
			_event.response().end();
		});*/

		hs.requestHandler(router::accept).listen(8080);

		System.out.println("### Iniciailizado ###");
	}

	public static void main (String _args[]) {
		Vertx vertx = Vertx.vertx();

        vertx.deployVerticle(new VertxPrincipal());

        vertx.deployVerticle(new AutorizacaoVerticle(), _authEnd -> {
        	System.out.println("Conectado!");
        });
	}
}