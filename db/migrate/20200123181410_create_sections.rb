class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :title
      t.string :icon

      t.string :sub_title
      t.text :body
      t.string :slug

      t.timestamps
    end
    add_index :sections, :slug
  end
end
