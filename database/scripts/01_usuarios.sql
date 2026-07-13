CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    pin VARCHAR(10),
    fecha_nacimiento DATE,
    fecha_registro DATETIME DEFAULT GETDATE()
);