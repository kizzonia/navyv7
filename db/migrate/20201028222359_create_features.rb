class CreateFeatures < ActiveRecord::Migration[5.2]
  def change
    create_table :features do |t|
      t.string :fimg
      t.string :title
      t.string :sub_title
      t.text :body
      t.string :slug

      t.timestamps
    end
    add_index :features, :slug
  end
end
