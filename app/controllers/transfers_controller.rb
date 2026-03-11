class TransfersController < InheritedResources::Base

layout "accounts"
  before_action :authenticate_user!
  before_action :find_transfer, only: [ :show, :edit, :update, :destroy]

    def index
      @users = User.where(user_id: current_user)
      @transfers = Transfer.where(user_id: current_user).order('created_at DESC')
      @accounts = Account.where(user_id: current_user).order('created_at ASC')
      @transactions = Transaction.where(user_id: current_user).order('created_at DESC')

    end

    def show
      @accounts = Account.where(user_id: current_user).order('created_at ASC')
      @otp = @transfer.otps.build

    end

    def new
      @transfer = current_user.transfers.build

    end

    def create
      @transfer = current_user.transfers.build(transfer_params)
      if @transfer.save
        user = User.find_by_id(@transfer.user_id)
        transfer = @transfer
        TransferMailer.transfer_email(user, transfer).deliver
        redirect_to  @transfer, notice: "Your OTP has been sent to your email"
      else
        render 'new'
      end
    end
    def edit

    end

    def update
      if @transfer.update(transfer_params)
        redirect_to @transfer
      else
        render 'edit'
      end
    end

    private
    def find_transfer
      @transfer = Transfer.friendly.find(params[:id])

    end

    def transfer_params
      params.require(:transfer).permit(:account_name, :transfer_type, :tref, :account_number, :routine_number, :swift_code, :user_id, :bank_name, :amount, :status, :account_id, :slug, :notes, :country, :otp, :pin)
    end

end
