class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :amount
      t.string :transac_type
      t.datetime :date
      t.string :purpose
      t.string :sender
      t.boolean :status
      t.references :user, foreign_key: true
      t.string :slug

      t.timestamps
    end
    add_index :transactions, :slug
  end
end
