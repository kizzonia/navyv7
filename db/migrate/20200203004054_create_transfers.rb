class CreateTransfers < ActiveRecord::Migration[5.2]
  def change
    create_table :transfers do |t|
      t.string :account_name
      t.string :account_number
      t.string :routine_number
      t.string :swift_code
      t.references :user, foreign_key: true
      t.string :bank_name
      t.string :amount
      t.boolean :status
      t.integer :account_id
      t.string :slug
      t.string :notes
      t.string :country
      t.string :otp
      t.string :pin

      t.timestamps
    end
    add_index :transfers, :slug
  end
end
