drop table if exists Users cascade;
drop table if exists Tasks cascade;
drop table if exists UsersSessions cascade;


create table if not exists Users(
    u_id integer,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(100),
    hash_password text,
    perm_type integer,
    time_registered  timestamp,
    primary key (u_id)
);

create table if not exists UsersSessions(
    u_id integer,
    tokens text,
    token_issue timestamp,
    foreign key (u_id) references Users(u_id)
);

create table if not exists Tasks(
    task_id integer,
    user_id integer,
    task varchar(100),
    hours_taken float,
    date_completed timestamp,
    primary key(task_id),
    foreign key (user_id) references Users(u_id)
);