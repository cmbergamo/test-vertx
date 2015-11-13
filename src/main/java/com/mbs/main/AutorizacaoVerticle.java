package com.mbs.main;

import com.mbs.seguranca.MbsAuth;
import io.netty.util.internal.SystemPropertyUtil;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;

/**
 * Created by Cristiano on 01/10/2015.
 */
public class AutorizacaoVerticle extends AbstractVerticle {

	private JDBCClient jdbc;
	private MbsAuth authProvider = null;

	/*@Override
	public void stop() throws Exception {
		super.stop();

		authProvider.finalizaConexao();
		jdbc.close();

	}*/
	
	@Override
	public void start(Future<Void> _startFuture) throws Exception {
		jdbc = JDBCClient.createShared(vertx, new JsonObject()
				.put("url", "jdbc:postgresql://localhost:5432/pg_login")
				.put("user", "postgres")
				.put("password", "postgres")
				.put("driver_class", "org.postgresql.Driver"), "login_ds");

		authProvider = new MbsAuth();

		EventBus eb = vertx.eventBus();
		eb.consumer("erp.autenticarcao", _event -> {
			JsonObject authInfo = (JsonObject) _event.body();

			authProvider.authenticate(authInfo, _authHandler -> {
				System.out.println("#2");

				if (_authHandler.succeeded()) {
					System.out.println("#3");
					DeliveryOptions deo = new DeliveryOptions().setCodecName("mbsUsuarioCodec");
					_event.reply(_authHandler.result(), deo);
				} else {
					System.out.println("#4");
					System.err.println(_authHandler.cause());
					_event.fail(1, "Usuário inválido!");
				}

			});
		});

		jdbc.getConnection( connection -> {
			if (connection.succeeded()) {
				authProvider.setConnection(connection.result());

				_startFuture.complete();
			} else {
				System.err.println(connection.cause());
			}
		});
	}
	
}
