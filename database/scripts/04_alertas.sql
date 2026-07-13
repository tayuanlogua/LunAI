CREATE TABLE alertas (
    id_alerta INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    mensaje VARCHAR(500),
    nivel_riesgo VARCHAR(20),
    fecha DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
);