class CreateLoans < ActiveRecord::Migration[6.1]
  def change
    create_table :loans do |t|
      t.string :business_name
      t.string :budget
      t.string :amount
      t.string :interest
      t.string :desc
      t.string :project_name
      t.string :project_size
      t.string :project_desc
      t.datetime :date
      t.string :name
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :slug
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :loans, :slug
  end
end
