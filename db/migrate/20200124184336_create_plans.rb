class CreatePlans < ActiveRecord::Migration[5.2]
  def change
    create_table :plans do |t|
      t.string :title
      t.string :planimg
      t.string :sub_title
      t.text :body
      t.string :slug

      t.timestamps
    end
    add_index :plans, :slug
  end
end
