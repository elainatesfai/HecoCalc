
export default function CompaniesSelect(companyChoice) {
    
    const select = (event) => {
        localStorage.setItem("company", event.target.value);
    };



    return (
        <div>
          <h1>Choose Company</h1>
          <br></br>
          <div className="login-settings-form-div">
            <form>
              <select onChange={select}>
                <option value='Select'>-Select-</option>
              {companyChoice.map((item) => {
              return <option value={item}>{item}</option>;
                })}
              </select>
            </form>
          </div>
        </div>
      );
  }