
CREATE SEQUENCE todo_list_id_todo_list_seq;

CREATE TABLE todo_list (
    id_todo_list INTEGER NOT NULL DEFAULT nextval('todo_list_id_todo_list_seq'),
    owner VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    CONSTRAINT id_todo_list PRIMARY KEY (id_todo_list)
);


ALTER SEQUENCE todo_list_id_todo_list_seq OWNED BY todo_list.id_todo_list;

CREATE SEQUENCE todo_id_todo_seq;

CREATE TABLE todo (
    id_todo INTEGER NOT NULL DEFAULT nextval('todo_id_todo_seq'),
    id_todo_list INTEGER NOT NULL,
    content VARCHAR NOT NULL,
    status VARCHAR DEFAULT 'todo' NOT NULL,
    CONSTRAINT id_todo PRIMARY KEY (id_todo, id_todo_list)
);


ALTER SEQUENCE todo_id_todo_seq OWNED BY todo.id_todo;

ALTER TABLE todo ADD CONSTRAINT todo_list_todo_fk
FOREIGN KEY (id_todo_list)
REFERENCES todo_list (id_todo_list)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;