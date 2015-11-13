package com.mbs.seguranca;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

/**
 * Controle de geração do HASH para as senhas a serem salvas pelo sistema.
 * O sistema MBS não salvará a senha do cliente, somente o hash em byte[].
 * É necessário gerar uma salt (sequencia aleatoria de caracteres) para adicionar uma camada extra de segurança ao hash que será criado;
 * 
 * Sequencia:
 * 1. Cliente informa senha;
 * 2. Sistema gera salt;
 * 3. Acoplar salt a senha;
 * 4. Gerar o hash;
 * 5. Salvar o hash e a salt;
 *  * 
 * @author MBS
 *
 */
public class MbsPassword {
	
	public static byte[] gerarHash(String _frase, String _salt) throws NoSuchAlgorithmException {
		MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
		String aux = _frase.concat(_salt);
		byte[] passHash = sha256.digest( aux.getBytes() );
		return passHash;
	}
	
    public static String gerarSalt() {
		return UUID.randomUUID().toString();
    }
	
}