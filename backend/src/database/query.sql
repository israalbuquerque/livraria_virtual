use bd_livrariaonline;

DESCRIBE editoras;
SHOW CREATE TABLE livros;

ALTER TABLE compras 
DROP foreign key compras_ibfk_1;

ALTER TABLE compras 
DROP foreign key compras_ibfk_2;

ALTER TABLE livros
ADD CONSTRAINT 
FOREIGN KEY (id_editora)
REFERENCES editoras(id_editora)
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE livros
ADD CONSTRAINT  
FOREIGN KEY (id_categoria)
REFERENCES categorias(id_categoria)
ON DELETE CASCADE 
ON UPDATE CASCADE;


SHOW CREATE TABLE compras;

ALTER TABLE compras
ADD FOREIGN KEY (id_livro)
REFERENCES livros(id_livro)
ON DELETE CASCADE 
ON UPDATE CASCADE;

ALTER TABLE compras
ADD FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente)
ON DELETE CASCADE 
ON UPDATE CASCADE;

select * from clientes where email = "fernanda.carvalho3@email.br" and id_cliente != "20";

create table roles(
role_id int auto_increment primary key,
role_name varchar(50) not null unique
);

create table users (
	user_id int auto_increment primary key,
    user_name varchar(150) not null,
    user_email varchar(150) not null,
    user_password varchar(255) not null,
    user_phone varchar (20),
    role_id int not null,
    user_status boolean default true,
    user_createdAt timestamp default current_timestamp,
    user_updatedAt timestamp default current_timestamp
		on update current_timestamp,
	foreign key (role_id) references roles (role_id)
);

insert into roles (role_name) 
values ("clientes"), ("vendedor"), ("gerente"), ("admin");

insert into users (user_name, user_email, user_password, user_phone, role_id)
values ("Joao Oliveira", "joao_oliveira@gmail.com", "123456", "123456789", 1),
		("Helena Oliveira", "helena_oliveira@gmail.com", "789456", "123456789", 2),
        ("Jose Oliveira", "jose_oliveira@gmail.com", "123456", "123456789", 3),
		("Maria Oliva", "Maria_oliva@gmail.com", "127894", "123456789", 4);
        
select * from users;



