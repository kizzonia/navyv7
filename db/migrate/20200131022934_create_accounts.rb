class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :address
      t.string :country
      t.string :avatar

      t.string :zip_code
      t.string :ssn
      t.string :mmn
      t.integer :account_pin
      t.string :account_number
      t.string :routine_number
      t.string :dob
      t.string :slug
      t.float :balance
      t.string :occupation_address
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :accounts, :slug
  end
end
