class CreateAbouts < ActiveRecord::Migration[5.2]
  def change
    create_table :abouts do |t|
      t.string :abtimg
      t.string :title
      t.string :sub_title
      t.text :body
      t.string :slug

      t.timestamps
    end
    add_index :abouts, :slug
  end
end
