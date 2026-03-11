class CreateFeedbacks < ActiveRecord::Migration[5.2]
  def change
    create_table :feedbacks do |t|
      t.string :icon
      t.string :title
      t.string :sub_title
      t.text :body
      t.string :slug

      t.timestamps
    end
    add_index :feedbacks, :slug
  end
end
