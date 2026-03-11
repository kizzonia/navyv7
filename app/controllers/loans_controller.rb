class LoansController < InheritedResources::Base

  layout "accounts"
  add_flash_types :success, :danger, :info, :notice

  before_action :find_loan, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  def index
    @users = User.where(user_id: current_user)
    @plans = Plan.all
    @transactions = Transaction.where(user_id: current_user).order('created_at DESC')
    @transfers = Transfer.where(user_id: current_user).order('created_at DESC')
    @loans = Loan.where(user_id: current_user).order('created_at ASC')
    @packages = Package.all.order('created_at ASC')

  end

  def show
    @loans = Loan.where(user_id: current_user).order('created_at ASC')

  end
  def userorder
    @users = User.where(user_id: current_user)
    @accounts = Account.where(user_id: current_user).order('created_at ASC')

    @packages = Package.all.order('created_at ASC')
    @loans = Loan.where(user_id: current_user).order('created_at ASC')

  end
  def new
    @plans = Plan.all
    @loan = current_user.loans.build
    @packages = Package.all.order('created_at ASC')

  end

  def create
    @loan = current_user.loans.build(loan_params)
    if @loan.save
      user = User.find_by_id(@loan.user_id)
      loan = @loan
      LoanMailer.loan_email(user, loan).deliver_later
      redirect_to root_path, notice: "loan Request Successfully Created You Will Be Contacted By Our Loans Agent"
    else
      render 'new'
    end
  end
  def edit
    @plans = Plan.all


  end

  def update
    @plans = Plan.all

    if @loan.update(loan_params)
      redirect_to root_path
    else
      render 'edit'
    end
  end
    private
    def find_loan
      @loan = Loan.friendly.find(params[:id])
    end
    def loan_params
      params.require(:loan).permit(:business_name, :budget, :phone,
  :ssn,
  :business_address,
  :buisness_type,
  :business_years,
  :loan_type,
  :bfs,
  :btr,
  :cr,
  :bp,
  :pfs, :step1_status, :step2_status,
 :step3_status, :ld, :status, :agreement, :amount, :interest, :desc, :ein_vat, :drivers_lfront,
:drivers_lback, :project_name, :project_size, :project_desc, :date, :name, :first_name, :last_name, :email, :slug, :user_id)
    end

end
