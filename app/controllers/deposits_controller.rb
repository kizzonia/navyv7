class DepositsController < InheritedResources::Base
  layout "accounts"
  add_flash_types :success, :danger, :info, :notice

  before_action :find_deposit, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  def index
    @users = User.where(user_id: current_user)
    @plans = Plan.all
    @transactions = Transaction.where(user_id: current_user).order('created_at DESC')
    @transfers = Transfer.where(user_id: current_user).order('created_at DESC')
    @deposits = Deposit.where(user_id: current_user).order('created_at ASC')
    @accounts = Account.where(user_id: current_user).order('created_at ASC')

  end

  def show

  end

  def new
    @plans = Plan.all
    @deposit = current_user.deposits.build

  end

  def create
    @deposit = current_user.deposits.build(deposit_params)
    if @deposit.save
      user = User.find_by_id(@deposit.user_id)
      deposit = @deposit
      # depositMailer.deposit_email(user, deposit).deliver_later
      redirect_to root_path, notice: "deposit Successfully Created"
    else
      render 'new'
    end
  end
  def edit
    @plans = Plan.all


  end

  def update
    @plans = Plan.all

    if @deposit.update(deposit_params)
      redirect_to root_path
    else
      render 'edit'
    end
  end
    private
    def find_deposit
      @deposit = Deposit.find(params[:id])
    end

    def deposit_params
      params.require(:deposit).permit(:method, :amount, :status, :date, :account_name, :account_number, :swiftcode, :routing_number, :btcw, :ethw, :btcnote, :user_id)
    end

end
