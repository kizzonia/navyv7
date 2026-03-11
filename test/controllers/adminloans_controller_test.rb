require "test_helper"

class AdminloansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @adminloan = adminloans(:one)
  end

  test "should get index" do
    get adminloans_url
    assert_response :success
  end

  test "should get new" do
    get new_adminloan_url
    assert_response :success
  end

  test "should create adminloan" do
    assert_difference('Adminloan.count') do
      post adminloans_url, params: { adminloan: { body: @adminloan.body, loan_id: @adminloan.loan_id, status: @adminloan.status, title: @adminloan.title, user_id: @adminloan.user_id, verified: @adminloan.verified } }
    end

    assert_redirected_to adminloan_url(Adminloan.last)
  end

  test "should show adminloan" do
    get adminloan_url(@adminloan)
    assert_response :success
  end

  test "should get edit" do
    get edit_adminloan_url(@adminloan)
    assert_response :success
  end

  test "should update adminloan" do
    patch adminloan_url(@adminloan), params: { adminloan: { body: @adminloan.body, loan_id: @adminloan.loan_id, status: @adminloan.status, title: @adminloan.title, user_id: @adminloan.user_id, verified: @adminloan.verified } }
    assert_redirected_to adminloan_url(@adminloan)
  end

  test "should destroy adminloan" do
    assert_difference('Adminloan.count', -1) do
      delete adminloan_url(@adminloan)
    end

    assert_redirected_to adminloans_url
  end
end
