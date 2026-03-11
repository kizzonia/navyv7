class CreateDeposits < ActiveRecord::Migration[6.1]
  def change
    create_table :deposits do |t|
      t.string :method
      t.string :amount
      t.boolean :status
      t.datetime :date
      t.string :account_name
      t.string :account_number
      t.string :swiftcode
      t.string :routing_number
      t.string :btcw
      t.string :ethw
      t.string :btcnote
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
