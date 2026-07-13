CREATE TABLE ciclos (
    id_ciclo INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    duracion_ciclo INT,
    duracion_periodo INT,
    fase_actual VARCHAR(50),

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
);