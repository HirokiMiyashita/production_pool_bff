CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30),
    email VARCHAR(30),
    phone_number VARCHAR(12),
    delete_flag BOOLEAN NOT NULL DEFAULT false,
    insert_datetime TIMESTAMP with time zone NOT NULL DEFAULT now(),
    update_datetime TIMESTAMP with time zone NOT NULL DEFAULT now()
);

COMMENT ON TABLE user IS '会員マスタ';

COMMENT ON COLUMN user.id IS '会員番号';
COMMENT ON COLUMN user.name IS '氏名';
COMMENT ON COLUMN user.email IS 'メールアドレス';
COMMENT ON COLUMN user.phone_number IS '電話番号';
COMMENT ON COLUMN user.delete_flag IS '論理削除フラグ';
COMMENT ON COLUMN user.insert_datetime IS '登録日時';
COMMENT ON COLUMN user.update_datetime IS '更新日時';