class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :name
      t.string :title
      t.string :boardimg
      t.string :body
      t.string :slug

      t.timestamps
    end
    add_index :boards, :slug
  end
end
