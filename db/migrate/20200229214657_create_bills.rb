class CreateBills < ActiveRecord::Migration[5.2]
  def change
    create_table :bills do |t|
      t.string :name
      t.string :service
      t.string :amount
      t.datetime :date
      t.boolean :status
      t.references :user, foreign_key: true
      t.string :slug

      t.timestamps
    end
    add_index :bills, :slug
  end
end
