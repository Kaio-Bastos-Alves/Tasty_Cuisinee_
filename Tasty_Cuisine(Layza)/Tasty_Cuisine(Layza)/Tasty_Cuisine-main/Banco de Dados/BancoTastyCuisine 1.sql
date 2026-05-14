CREATE DATABASE TASTYCUISINE
GO
 
USE TASTYCUISINE
GO
 
 
CREATE TABLE Usuario (
    Cod_user INT IDENTITY(1,1) PRIMARY KEY,
    Status_User BIT,
    Nome_completo NVARCHAR(300) NOT NULL,
    Nome_de_usuario NVARCHAR(60) NOT NULL,
    Idade INT NOT NULL,
    Gmail NVARCHAR(255) NOT NULL UNIQUE,
    Senha NVARCHAR(250) NOT NULL,
    Restricoes_alimentares NVARCHAR(MAX),
);
-- 3. Tabela de Chefe
CREATE TABLE Chefe (
    Cod_chefe INT IDENTITY(1,1) PRIMARY KEY,
    Nome_usuario NVARCHAR(60) NOT NULL,
    Nome_completo NVARCHAR(300) NOT NULL,
    Idade INT NOT NULL,
    Senha NVARCHAR(250) NOT NULL,
    Gmail NVARCHAR(255) NOT NULL UNIQUE,
    foto_perfil VARBINARY(MAX)
);
 
-- 4. Tabela de Categorias
CREATE TABLE Categorias (
    Cod_Categoria INT IDENTITY(1,1) PRIMARY KEY,
    Nome_Categoria NVARCHAR(100) NOT NULL,
    Tipo_Categoria NVARCHAR(50) NOT NULL, -- 'Receita' , 'Restaurante' ou 'chefe'
    icone VARBINARY(MAX) 
);
-- 5. Tabela de Receitas
CREATE TABLE Receitas (
    Cod_receitas INT IDENTITY(1,1) PRIMARY KEY,
    Nome_receita NVARCHAR(250) NOT NULL,
    Descricao NVARCHAR(250) NOT NULL,
    Modo_preparo NVARCHAR(MAX) NOT NULL,
    Ingredientes NVARCHAR(MAX),
    Cod_chefe INT NOT NULL,
    Foto_receita VARBINARY(MAX),
    FOREIGN KEY (Cod_chefe) REFERENCES Chefe(Cod_chefe),
    CONSTRAINT chk_ingredientes CHECK (Ingredientes IS NULL OR ISJSON(Ingredientes) = 1),
    CONSTRAINT chk_modo_preparo CHECK (ISJSON(Modo_preparo) = 1)
);
 
-- 6. Tabela de premiacoes
CREATE TABLE Premiacoes (
    Cod_premiacao INT IDENTITY(1,1) PRIMARY KEY,
    Cod_chefe INT NOT NULL,
    Nome_premiacao NVARCHAR(100) NOT NULL,
    Ano INT,
    Descricao NVARCHAR(255),
    Foto_certificado VARBINARY(MAX),
    FOREIGN KEY (Cod_chefe) REFERENCES Chefe(Cod_chefe)
);
 
-- 7. Tabelas de ligação para categorias
CREATE TABLE Receitas_Categorias (
    Cod_receitas INT NOT NULL,
    Cod_Categoria INT NOT NULL,
    PRIMARY KEY (Cod_receitas, Cod_Categoria),
    FOREIGN KEY (Cod_receitas) REFERENCES Receitas(Cod_receitas),
    FOREIGN KEY (Cod_Categoria) REFERENCES Categorias(Cod_Categoria)
);
 
 
CREATE TABLE Chefe_Categorias (
    Cod_chefe INT NOT NULL,
    Cod_Categoria INT NOT NULL,
    PRIMARY KEY (Cod_chefe, Cod_Categoria),
    FOREIGN KEY (Cod_chefe) REFERENCES Chefe(Cod_chefe),
    FOREIGN KEY (Cod_Categoria) REFERENCES Categorias(Cod_Categoria)
);
 

-- 9. Tabela de Avaliações

CREATE TABLE Avaliacoes (
    Cod_avaliacao BIGINT IDENTITY(1,1) PRIMARY KEY,
    Cod_user INT NOT NULL,
    Cod_receitas INT NULL,
    Nota INT NOT NULL CHECK (Nota BETWEEN 1 AND 5),
    Data_Avaliacao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (Cod_user) REFERENCES Usuario(Cod_user),
    FOREIGN KEY (Cod_receitas) REFERENCES Receitas(Cod_receitas)
);
-- 10. Tabela de Favoritos
CREATE TABLE Favoritos (
    Cod_favoritos BIGINT IDENTITY(1,1) PRIMARY KEY,
    Cod_user INT NOT NULL,
    Cod_receitas INT,
    FOREIGN KEY (Cod_user) REFERENCES Usuario(Cod_user),
    FOREIGN KEY (Cod_receitas) REFERENCES Receitas(Cod_receitas)
);
 
-- 11. Tabela de Comentários
CREATE TABLE Comentarios (
    Cod_comentarios BIGINT IDENTITY(1,1) PRIMARY KEY,
    Cod_user INT NOT NULL,
    Cod_receitas INT NULL,
    Texto NVARCHAR(300) NOT NULL,
    Data_Comentario DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (Cod_user) REFERENCES Usuario(Cod_user),
    FOREIGN KEY (Cod_receitas) REFERENCES Receitas(Cod_receitas)
);
 
-- 12. Tabela de Acessos
CREATE TABLE Acessos (
    Id_Acesso BIGINT IDENTITY(1,1) PRIMARY KEY,
    Cod_user INT NOT NULL,
    Cod_receitas INT NULL,
    Cod_chefe INT NULL,
    Data_Acesso DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (Cod_user) REFERENCES Usuario(Cod_user),
    FOREIGN KEY (Cod_receitas) REFERENCES Receitas(Cod_receitas),
    FOREIGN KEY (Cod_chefe) REFERENCES Chefe(Cod_chefe),
);
-- 13. Tabela de Administradores
CREATE TABLE Adm (
    Cod_moderador INT IDENTITY(1,1) PRIMARY KEY,
    Nome_do_adm NVARCHAR(250) NOT NULL,
    Gmail NVARCHAR(250) NOT NULL,
    Senha NVARCHAR(250) NOT NULL,
    Cod_user INT,
    Cod_chefe INT,
    Cod_receitas INT,
    FOREIGN KEY (Cod_user) REFERENCES Usuario(Cod_user),
    FOREIGN KEY (Cod_chefe) REFERENCES Chefe(Cod_chefe),
    FOREIGN KEY (Cod_receitas) REFERENCES Receitas(Cod_receitas)
);

 
GO
-- 14. Inserts de exemplo
INSERT INTO Usuario (Nome_completo, Nome_de_usuario, Idade, Gmail, Senha, Restricoes_alimentares)
VALUES
('Victor Lucchi','vefal',16,'vefal@gmail.com','seila12','glutem'),
('Maria Oliveira','mariolive',25,'maria@gmail.com','123456','lactose');
INSERT INTO Chefe (Nome_completo, Nome_usuario, Idade, Senha, Gmail)
VALUES
('Vitoria Sabino Nascimento','Vick',21,'123456','VitoriaNascimento@gmail.com'),
('Lucas Henrique Freitas','liulixo',16,'12321','lillixo@gmail.com'),
('karolina ferreira de august','karolzinha augusta', 27 ,'123','karolaugusta@gmail.com'),
('eriko jacquin', 'jacquinho', 19, 'desliga freeza anoite', 'jacquinprofissa@gmail.com'),
('Ana Clara Mendes', 'anaclara', 28, 'senha123', 'anaclara@gmail.com'),
('Rafael Souza', 'rafsouza', 35, '123senha', 'rafael.souza@gmail.com'),
('Priya Kapoor', 'priyak', 32, 'senha456', 'priya.kapoor@gmail.com'),
('Gustavo Lima', 'gustavo.l', 26, 'abc123', 'gustavo.lima@gmail.com'),
('Beatriz Fonseca', 'beaf', 29, 'xyz789', 'beatriz.fonseca@gmail.com');
INSERT INTO Receitas (Nome_receita, Descricao, Modo_preparo, Ingredientes, Cod_chefe)
VALUES
('Oriente Médio','Sopa de bactérias e pão mofado',
'["Aqueça a água do mar morto em fogo médio", "Adicione o pão velho e deixe amolecer", "Sirva quente"]',
'[{"quantidade":"1","unidade":"litro","nome":"água salgada"},{"quantidade":"2","unidade":"fatias","nome":"pão velho"}]',
2),
('Bolo de Chocolate','Bolo delicioso e fofinho',
'["Misture a farinha, açúcar e chocolate em pó", "Adicione os ovos e a manteiga derretida", "Despeje o leite e misture bem", "Asse em forno preaquecido a 180°C por 40 minutos"]',
'[{"quantidade":"2","unidade":"xícaras","nome":"farinha"},{"quantidade":"3","unidade":"unidades","nome":"ovos"},{"quantidade":"4","unidade":"colheres","nome":"chocolate em pó"},{"quantidade":"100","unidade":"gramas","nome":"manteiga"},{"quantidade":"1","unidade":"xícara","nome":"açúcar"},{"quantidade":"1","unidade":"xícara","nome":"leite"}]',
1);

INSERT INTO Categorias (Nome_Categoria, Tipo_Categoria)
VALUES
('Vegano','Receita'),
('Sobremesa','Receita'),
('Vegetariano','Chefe'),
('Indiano','Chefe'),
('Italiana','Chefe'),
('Francês','Chefe');
 
INSERT INTO Receitas_Categorias (Cod_receitas, Cod_Categoria)
VALUES
(1,1),
(2,2);

 
 
-- Exemplo de vinculação de chefes às categorias
INSERT INTO Chefe_Categorias (Cod_chefe, Cod_Categoria)
VALUES 
(1, (SELECT TOP 1 Cod_Categoria FROM Categorias WHERE Nome_Categoria='Vegetariano' AND Tipo_Categoria='Chefe')),
(2, (SELECT TOP 1 Cod_Categoria FROM Categorias WHERE Nome_Categoria='Indiano' AND Tipo_Categoria='Chefe')),
(3, (SELECT TOP 1 Cod_Categoria FROM Categorias WHERE Nome_Categoria='Italiana' AND Tipo_Categoria='Chefe')),
(4, (SELECT TOP 1 Cod_Categoria FROM Categorias WHERE Nome_Categoria='Francês' AND Tipo_Categoria='Chefe')),
(5, (SELECT TOP 1 Cod_Categoria FROM Categorias WHERE Nome_Categoria='Vegetariano' AND Tipo_Categoria='Chefe'));
 
INSERT INTO Acessos (Cod_user, Cod_receitas, Cod_chefe)
VALUES
(1,1,2),
(2,2,1),
(1,2,1),
(2,1,2),
(1,2,1);
 
 
INSERT INTO Premiacoes (Cod_chefe, Nome_premiacao, Ano, Descricao)
VALUES
(1, 'Melhor Chef do Ano', 2022, 'Reconhecimento nacional pelo prato inovador.'),
(1, 'Prêmio Gastronomia Sustentável', 2023, 'Uso de ingredientes orgânicos e locais.'),
(2, 'Chef Revelação', 2021, 'Prêmio para novos talentos da culinária brasileira.');
 
GO
--=====================================
--===           VIEWS                 ===
--=====================================
 
-- 1️⃣ View de Usuários Inativos
-- Detecta usuários que não acessam há mais de 30 dias
GO
CREATE OR ALTER VIEW vw_UsuariosInativos AS
SELECT 
    u.Cod_user,
    u.Nome_de_usuario,
    MAX(a.Data_Acesso) AS Ultimo_Acesso,
    DATEDIFF(DAY, MAX(a.Data_Acesso), GETDATE()) AS Dias_Desde_Ultimo_Acesso
FROM Usuario u
LEFT JOIN Acessos a ON u.Cod_user = a.Cod_user
GROUP BY u.Cod_user, u.Nome_de_usuario;
 
GO
-- View de Ranking de Chefes
-- Média de avaliações e total de avaliações por chefe
CREATE OR ALTER VIEW vw_RankingChefes AS
SELECT 
    c.Cod_chefe,
    c.Nome_usuario,
    AVG(CAST(a.Nota AS FLOAT)) AS Media_Avaliacao,
    COUNT(a.Nota) AS Total_Avaliacoes
FROM Chefe c
LEFT JOIN Receitas r ON c.Cod_chefe = r.Cod_chefe
LEFT JOIN Avaliacoes a ON r.Cod_receitas = a.Cod_receitas
GROUP BY c.Cod_chefe, c.Nome_usuario;
 
GO
-- 4️⃣ View de Ranking de Receitas
-- Média de avaliações e total de avaliações
CREATE OR ALTER VIEW vw_RankingReceitas AS
SELECT 
    rec.Cod_receitas,
    rec.Nome_receita,
    AVG(CAST(a.Nota AS FLOAT)) AS Media_Avaliacao,
    COUNT(a.Nota) AS Total_Avaliacoes
FROM Receitas rec
LEFT JOIN Avaliacoes a ON rec.Cod_receitas = a.Cod_receitas
GROUP BY rec.Cod_receitas, rec.Nome_receita;
 
 
GO
-- 13. Consultas usando views
 
--=====================================
--===           Receitas            ===
--=====================================
 
-- Receitas por categoria
SELECT 
    c.Nome_Categoria,
    r.Nome_receita,
    r.Descricao
FROM Receitas r
JOIN Receitas_Categorias rc ON r.Cod_receitas = rc.Cod_receitas
JOIN Categorias c ON rc.Cod_Categoria = c.Cod_Categoria
WHERE c.Tipo_Categoria = 'Receita'
ORDER BY c.Nome_Categoria, r.Nome_receita;
 
-- Top 5 Receitas mais acessadas
SELECT TOP 5
    r.Nome_receita,
    COUNT(a.Id_Acesso) AS Total_Acessos
FROM Receitas r
INNER JOIN Acessos a ON r.Cod_receitas = a.Cod_receitas
GROUP BY r.Nome_receita
ORDER BY Total_Acessos DESC;
 
-- Top 5 Receitas mais acessadas por categoria
SELECT TOP 5
    r.Nome_receita,
    c.Nome_Categoria,
    COUNT(a.Id_Acesso) AS Total_Acessos
FROM Receitas r
INNER JOIN Receitas_Categorias rc ON r.Cod_receitas = rc.Cod_receitas
INNER JOIN Categorias c ON rc.Cod_Categoria = c.Cod_Categoria
INNER JOIN Acessos a ON r.Cod_receitas = a.Cod_receitas
WHERE c.Tipo_Categoria = 'Receita'
GROUP BY r.Nome_receita, c.Nome_Categoria
ORDER BY Total_Acessos DESC;
 
-- Top 5 Receitas mais bem avaliadas (usando view)
SELECT TOP 5 *
FROM vw_RankingReceitas
ORDER BY Media_Avaliacao DESC, Total_Avaliacoes DESC;
 
 
--==================================================
--===                  Chefes                    ===
--==================================================
 
-- Top 5 Chefes mais acessados
SELECT TOP 5
    c.Nome_usuario,
    COUNT(a.Id_Acesso) AS Total_Acessos
FROM Chefe c
INNER JOIN Acessos a ON c.Cod_chefe = a.Cod_chefe
GROUP BY c.Nome_usuario
ORDER BY Total_Acessos DESC;
 
-- Chefes e suas Premiações
SELECT 
    c.Nome_usuario,
    STUFF((SELECT ', ' + p.Nome_premiacao 
           FROM Premiacoes p
           WHERE p.Cod_chefe = c.Cod_chefe
           FOR XML PATH('')), 1, 2, '') AS Premiacoes
FROM Chefe c;
 
-- Chefes e suas informações detalhadas
SELECT
    c.Cod_chefe,
    c.Nome_completo,
    c.Nome_usuario,
    c.Idade,
    c.Gmail,
    -- Categorias associadas
    STUFF((SELECT DISTINCT ', ' + cat2.Nome_Categoria 
           FROM Chefe_Categorias cc2 
           JOIN Categorias cat2 ON cc2.Cod_Categoria = cat2.Cod_Categoria 
           WHERE cc2.Cod_chefe = c.Cod_chefe 
           FOR XML PATH('')), 1, 2, '') AS Categorias,
    -- Premiações
    STUFF((SELECT DISTINCT ', ' + p2.Nome_premiacao 
           FROM Premiacoes p2 
           WHERE p2.Cod_chefe = c.Cod_chefe 
           FOR XML PATH('')), 1, 2, '') AS Premiacoes,
    -- Receitas
    STUFF((SELECT DISTINCT ', ' + rec2.Nome_receita 
           FROM Receitas rec2 
           WHERE rec2.Cod_chefe = c.Cod_chefe 
           FOR XML PATH('')), 1, 2, '') AS Receitas
FROM Chefe c
GROUP BY
    c.Cod_chefe,
    c.Nome_completo,
    c.Nome_usuario,
    c.Idade,
    c.Gmail
ORDER BY c.Nome_usuario;
 
-- Top 5 Chefes mais bem avaliados (usando view)
SELECT TOP 5 *
FROM vw_RankingChefes
ORDER BY Media_Avaliacao DESC, Total_Avaliacoes DESC;
 
 
--===================================================
--===             Usuários                   ===
--===================================================
 
 
-- Usuários inativos (usando view)
SELECT *
FROM vw_UsuariosInativos
ORDER BY Dias_Desde_Ultimo_Acesso DESC;
 
SELECT * FROM Usuario