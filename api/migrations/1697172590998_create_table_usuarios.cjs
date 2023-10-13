module.exports = {
    "up": "CREATE TABLE usuarios (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, senha VARCHAR(255), fone VARCHAR(255) NOT NULL, plano VARCHAR(255))",
    "down": "DROP TABLE usuarios"
}