package com.mbs.utils;

import com.mbs.seguranca.MbsUsuario;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.eventbus.MessageCodec;

import java.io.*;

/**
 * Created by Cristiano on 20/10/2015.
 */
public class MbsUsuarioCodec implements MessageCodec<MbsUsuario, MbsUsuario> {

	@Override
	public void encodeToWire(Buffer _buffer, MbsUsuario _mbsUsuario) {
		/*JsonObject job = new JsonObject(_buffer.getString(0,_buffer.length()));

		_mbsUsuario.setXmlEntry(job.getString("xmlentry"));
		_mbsUsuario.setSenha(job.getBinary("senha"));
		_mbsUsuario.setSalt(job.getString("salt"));
		_mbsUsuario.setNomeUsuario(job.getString("nomeusuario"));
		_mbsUsuario.setDica(job.getString("dica"));

		ByteArrayInputStream bis = new ByteArrayInputStream(_buffer.getBytes(8));
		_mbsUsuario.setAuthProvider(new ObjectInputStream());*/

		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			ObjectOutputStream oos = new ObjectOutputStream(bos);

			oos.writeObject(this);
			_buffer.setBytes(0, bos.toByteArray());

			oos.close();
			bos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public MbsUsuario decodeFromWire(int pos, Buffer buffer) {
		ByteArrayInputStream bis = new ByteArrayInputStream(buffer.getBytes(pos, buffer.length()));

		ObjectInputStream ois = null;

        MbsUsuario user = null;

		try {
			ois = new ObjectInputStream(bis);
			user = (MbsUsuario) ois.readObject();
		} catch (IOException _e) {
			_e.printStackTrace();
		} catch (ClassNotFoundException _e) {
			System.err.println(_e);
		}

        return user;
	}

	@Override
	public MbsUsuario transform(MbsUsuario mbsUsuario) {
		return null;
	}

	@Override
	public String name() {
		return "mbsUsuarioCodec";
	}

	@Override
	public byte systemCodecID() {
		return -1;
	}
}
