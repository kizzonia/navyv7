class CreateServices < ActiveRecord::Migration[5.2]
  def change
    create_table :services do |t|
      t.string :title
      t.string :sub_title
      t.text :body
      t.string :slug

      t.timestamps
    end
    add_index :services, :slug
  end
end
