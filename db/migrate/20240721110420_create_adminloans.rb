class CreateAdminloans < ActiveRecord::Migration[6.1]
  def change
    create_table :adminloans do |t|
      t.text :body
      t.boolean :status
      t.boolean :verified
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.integer :loan_id

      t.timestamps
    end
  end
end
