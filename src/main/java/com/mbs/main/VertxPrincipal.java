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

		SessionStore store = LocalSessionStore.create(vertx, "erpSession");

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

		router.route("/login.do").handler(BodyHandler.create()).handler(_event -> {
			_event.reroute("/dynamic/pageLogin.templ");
		});

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