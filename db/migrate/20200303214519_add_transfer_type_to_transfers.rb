class AddTransferTypeToTransfers < ActiveRecord::Migration[5.2]
  def change
    add_column :transfers, :transfer_type, :string
  end
end
