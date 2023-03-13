


export default function Repositories(choices) {
    
  const selectValue = (event) => {
    if(event.target.Value !== 'Select'){
      localStorage.setItem("repoName", event.target.value);
      var comp = localStorage.getItem("company");
      var rep = localStorage.getItem("repoName");
      localStorage.setItem("s3Link",(comp + "/Repositories/" + rep));
      console.log(localStorage.getItem("s3Link"));

    }
  };
    

  return (
    <div>
      <h1>Choose Repository</h1>
      <br></br>
      <div className="login-settings-form-div">
        <form>
          <select onChange={selectValue}>
            <option value='Select'>-Select-</option>
            {choices.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </form>
      </div>
    </div>
  );
}