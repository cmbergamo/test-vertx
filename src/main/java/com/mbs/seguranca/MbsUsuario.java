package com.mbs.seguranca;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AbstractUser;
import io.vertx.ext.auth.AuthProvider;

import java.util.Arrays;

/**
 * Created by Cristiano on 15/10/2015.
 */
public class MbsUsuario extends AbstractUser {

	private Integer codUsuario;
	private Integer codEmpresa;
	private String dica;
	private byte[] senha;
	private String salt;
	private String xmlEntry;
	private String nomeUsuario;
	private AuthProvider authProvider;

	public MbsUsuario(){
		super();
	}

	public MbsUsuario(Integer _codUsuario, Integer _codEmpresa, String _dica,
					  byte[] _senha, String _salt, String _xmlEntry, String _nomeUsuario) {
		super();
		this.codUsuario = _codUsuario;
		this.codEmpresa = _codEmpresa;
		this.dica = _dica;
		this.senha = _senha;
		this.salt = _salt;
		this.xmlEntry = _xmlEntry;
		this.nomeUsuario = _nomeUsuario;
	}

	public Integer getCodUsuario() {
		return codUsuario;
	}

	public void setCodUsuario(Integer _codUsuario) {
		this.codUsuario = _codUsuario;
	}

	public Integer getCodEmpresa() {
		return codEmpresa;
	}

	public void setCodEmpresa(Integer _codEmpresa) {
		this.codEmpresa = _codEmpresa;
	}

	public String getDica() {
		return dica;
	}

	public void setDica(String _dica) {
		this.dica = _dica;
	}

	public byte[] getSenha() {
		return senha;
	}

	public void setSenha(byte[] _senha) {
		this.senha = _senha;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String _salt) {
		this.salt = _salt;
	}

	public String getXmlEntry() {
		return xmlEntry;
	}

	public void setXmlEntry(String _xmlEntry) {
		this.xmlEntry = _xmlEntry;
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}

	public void setNomeUsuario(String _nomeUsuario) {
		this.nomeUsuario = _nomeUsuario;
	}

	@Override
	public int hashCode() {
		return codUsuario;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MbsUsuario other = (MbsUsuario) obj;
		if (codEmpresa == null) {
			if (other.codEmpresa != null)
				return false;
		} else if (!codEmpresa.equals(other.codEmpresa))
			return false;
		if (codUsuario == null) {
			if (other.codUsuario != null)
				return false;
		} else if (!codUsuario.equals(other.codUsuario))
			return false;
		if (dica == null) {
			if (other.dica != null)
				return false;
		} else if (!dica.equals(other.dica))
			return false;
		if (nomeUsuario == null) {
			if (other.nomeUsuario != null)
				return false;
		} else if (!nomeUsuario.equals(other.nomeUsuario))
			return false;
		if (salt == null) {
			if (other.salt != null)
				return false;
		} else if (!salt.equals(other.salt))
			return false;
		if (!Arrays.equals(senha, other.senha))
			return false;
		if (xmlEntry == null) {
			if (other.xmlEntry != null)
				return false;
		} else if (!xmlEntry.equals(other.xmlEntry))
			return false;
		return true;
	}

	@Override
	protected void doIsPermitted(String permission, Handler<AsyncResult<Boolean>> resultHandler) {
		//TODO verificação de permissão;
	}

	@Override
	public JsonObject principal() {
		JsonObject json = new JsonObject();
		json.put("usuario", getNomeUsuario());
		json.put("codigoUsuario", getCodUsuario());
		json.put("codigoEmpresa", getCodEmpresa());
		return json;
	}

	@Override
	public void setAuthProvider(AuthProvider _authProvider) {
		authProvider = _authProvider;
	}


	@Override
	public int readFromBuffer(int pos, Buffer buffer) {
		return super.readFromBuffer(pos, buffer);
	}
}
