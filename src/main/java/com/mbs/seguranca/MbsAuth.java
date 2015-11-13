package com.mbs.seguranca;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.User;
import io.vertx.ext.sql.ResultSet;
import io.vertx.ext.sql.SQLConnection;

/**
* Created by Cristiano on 15/10/2015.
*/
public class MbsAuth implements AuthProvider {

	private SQLConnection connection;

	public MbsAuth() {
		connection = null;
	}

	public void setConnection(SQLConnection _connection) {
		connection = _connection;
	}

	public void closeConnection() {
		connection.close();
	}

	@Override
	public void authenticate(JsonObject _authInfo, Handler<AsyncResult<User>> _resultHandler) {
		
			if (connection != null && _authInfo != null && _authInfo.getString("usuario") != null && _authInfo.getString("senha") != null) {
				System.out.println("#6");

				connection.query("SELECT * FROM fun_login('" + _authInfo.getString("usuario") + "')", _resultSet -> {
					System.out.println("#7");
					MbsAuthAsyncResult retorno = new MbsAuthAsyncResult();

					try {
						if (_resultSet.succeeded()) {

							System.out.println("#8");
							ResultSet rs = _resultSet.result();
							List<JsonObject> linhas = rs.getRows();

							for (JsonObject linha : linhas) {
								try {
									if (Arrays.equals(MbsPassword.gerarHash(_authInfo.getString("senha"), linha.getString("col_senha_salt")), linha.getBinary("col_senha"))) {

										MbsUsuario user = new MbsUsuario();
										user.setCodEmpresa(linha.getInteger("col_id_empresa"));
										user.setCodUsuario(linha.getInteger("col_id_usuario"));
										user.setDica(linha.getString("col_dica"));
										user.setNomeUsuario(linha.getString("col_nome"));
										user.setSalt(linha.getString("col_senha_salt"));
										user.setSenha(linha.getBinary("col_senha"));
										user.setXmlEntry(linha.getString("col_xml_entry"));

										user.setAuthProvider(this);

										retorno.setUser(user);
										retorno.setSucces(true);

										break;
									}
								} catch (NoSuchAlgorithmException _e) {
									System.err.println(_e);
								} catch (Exception _e) {
									System.err.println("### Erros gerais ###");
									System.err.println(_e);
									System.err.println("___###___");
								}
							}
						}

						_resultHandler.handle(retorno);
					} catch (Exception _e) {
						System.err.println("### Erros gerais finais ###");
						System.err.println(_e);
						System.err.println("___###___");
					}
				});
			}
	}

}

class MbsAuthAsyncResult implements AsyncResult<User> {

	private boolean succeeded;
	private User user;
	private Throwable error;

	public MbsAuthAsyncResult() {
		succeeded = false;
		user = null;
		error = null;
	}

	public void setSucces(boolean _success) {
		succeeded = _success;
	}

	public void setUser(User _user) {
		user = _user;
	}

	public void setCause(Throwable _error) {
		error = _error;
	}

	@Override
	public User result() {
		return user;
	}

	@Override
	public Throwable cause() {
		return error;
	}

	@Override
	public boolean succeeded() {
		return succeeded;
	}

	@Override
	public boolean failed() {
		return !succeeded;
	}

}
