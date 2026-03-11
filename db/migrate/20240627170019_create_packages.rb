class CreatePackages < ActiveRecord::Migration[6.1]
  def change
    create_table :packages do |t|
      t.string :title
      t.string :pkimg
      t.string :sub_title
      t.text :body
      t.string :slug
      t.datetime :duration
      t.string :rate
      t.string :droi
      t.string :icon

      t.timestamps
    end
    add_index :packages, :slug
  end
end
