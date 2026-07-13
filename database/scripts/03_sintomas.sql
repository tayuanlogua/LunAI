CREATE TABLE sintomas (
    id_sintoma INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    fecha DATE,

    dolor INT,
    acne BIT,
    cansancio BIT,
    dolor_cabeza BIT,
    hinchazon BIT,

    estado_emocional VARCHAR(50),

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
);
