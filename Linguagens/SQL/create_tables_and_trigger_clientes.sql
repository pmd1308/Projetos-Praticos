CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf CHAR(14),
  cnpj CHAR(18),
  data_nascimento DATE,
  email VARCHAR(255),
  endereco VARCHAR(255) NOT NULL,
  numero INT NOT NULL,
  complemento VARCHAR(100),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cep VARCHAR(10) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  celular VARCHAR(15) NOT NULL,
  -- Outros campos opcionais
);

CREATE TABLE IF NOT EXISTS auditoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tabela VARCHAR(255) NOT NULL,
  acao VARCHAR(10) NOT NULL,
  data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario VARCHAR(255) NOT NULL,
  ip_usuario VARCHAR(45),
  registro_id INT NOT NULL,
  dados_antigos JSON,
  dados_novos JSON,
  FOREIGN KEY (registro_id) REFERENCES clientes(id)
);

CREATE TRIGGER auditar_clientes
AFTER INSERT OR UPDATE OR DELETE ON clientes
FOR EACH ROW
BEGIN
  IF @@TRIGGER_ID != 'auditar_clientes' THEN
    INSERT INTO auditoria (
      tabela,
      acao,
      data_hora,
      usuario,
      ip_usuario,
      registro_id,
      dados_antigos,
      dados_novos
    ) VALUES (
      'clientes',
      CASE
        WHEN NEW.id IS NOT NULL THEN 'UPDATE'
        WHEN OLD.id IS NOT NULL THEN 'DELETE'
        ELSE 'INSERT'
      END,
      CURRENT_TIMESTAMP,
      CURRENT_USER,
      CONNECTION_PROPERTY('inet_server_addr'),
      NEW.id,
      -- Capturar e serializar dados antigos
      JSON_OBJECT(),
      -- Capturar e serializar dados novos
      JSON_OBJECT()
    );
  END IF;
END;
