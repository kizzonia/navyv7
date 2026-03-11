class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :card_number
      t.string :cvv
      t.datetime :date
      t.string :slug
      t.boolean :status
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :cards, :slug
  end
end
