import DataTable, { createTheme } from "react-data-table-component";
import "../css/edittree.css";
import {
  fChild,
  ffChild,
  fffChild,
  fsChild,
  sChild,
  sfChild,
  ssChild,
  sffChild,
  sfffChild,
  ssffChild,
} from "../data/ChildrenData";
export default function EditTree({
  open,
  setCost1,
  setCost2,
  setCost3,
  setCost4,
  setCost5,
  setDays1,
  setDays2,
  setDays3,
  setDays4,
}) {
  document.body.style.overflowX = "hidden";

  const costColumns = [
    {
      name: "Costs (£)",
      selector: (row) => row.title,
    },
    {
      name: "",
      selector: (row) => row.cost,
    },
  ];

  const costData = [
    {
      title: fffChild(),
      cost: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem("cValue: " + fffChild())}
          onInput={(e) => {
            localStorage.setItem("cValue: " + fffChild(), e.target.value);
          }}
        />
      ),
    },
    {
      title: fChild(),
      cost: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem("cValue: " + fChild())}
          onInput={(e) => {
            localStorage.setItem("cValue: " + fChild(), e.target.value);
          }}
        />
      ),
    },
    {
      title: sChild(),
      cost: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem("cValue: " + sChild())}
          onInput={(e) => {
            localStorage.setItem("cValue: " + sChild(), e.target.value);
          }}
        />
      ),
    },
    {
      title: "Drug - " + ffChild(),
      cost: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem("cValue: Drug - " + ffChild())}
          onInput={(e) => {
            localStorage.setItem("cValue: Drug - " + ffChild(), e.target.value);
          }}
        />
      ),
    },
    {
      title: "Drug - " + fsChild(),
      cost: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem("cValue: Drug - " + fsChild())}
          onInput={(e) => {
            localStorage.setItem("cValue: Drug - " + fsChild(), e.target.value);
          }}
        />
      ),
    },
  ];

  const edColumns = [
    {
      name: "Event Duration (Days)",
      selector: (row) => row.title,
    },
    {
      selector: (row) => row.days,
    },
  ];

  const edData = [
    {
      title: "LOS - " + ffChild(),
      days: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem("dValue: LOS - " + ffChild())}
          onInput={(e) => {
            localStorage.setItem("dValue: LOS - " + ffChild(), e.target.value);
          }}
        />
      ),
    },
    {
      title: "LOS - " + fsChild(),
      days: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem("dValue: LOS - " + fsChild())}
          onInput={(e) => {
            localStorage.setItem("dValue: LOS - " + fsChild(), e.target.value);
          }}
        />
      ),
    },
    {
      title: "Total duration of antibiotics (d) - " + ffChild(),
      days: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem(
            "dValue: Total duration of antibiotics (d) - " + ffChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "dValue: Total duration of antibiotics (d) - " + ffChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: "Total duration of antibiotics (d) - " + fsChild(),
      days: (
        <input
          className="var-inputs"
          placeholder={localStorage.getItem(
            "dValue: Total duration of antibiotics (d) - " + fsChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "dValue: Total duration of antibiotics (d) - " + fsChild(),
              e.target.value
            );
          }}
        />
      ),
    },
  ];

  const top = [
    {
      name: "Variables",
      selector: (row) => row.title,
    },
    {
      name: "",
    },
  ];

  const topData = [{}];

  const columns = [
    {
      name: "Transition Probabilities",
      selector: (row) => row.title,
    },
    {
      name: "",
      selector: (row) => row.value,
    },
  ];

  const data = [
    {
      title: fChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem("tpValue: DIGITAL")}
          onInput={(e) => {
            localStorage.setItem("tpValue: " + fChild(), e.target.value);
          }}
        />
      ),
    },
    {
      title: ffChild() + " - " + fChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + ffChild() + " - " + fChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + ffChild() + " - " + fChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: fffChild() + " - " + ffChild() + " - " + fChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + fffChild() + " - " + ffChild() + " - " + fChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + fffChild() + " - " + ffChild() + " - " + fChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: fffChild() + " - " + fsChild() + " - " + fChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + fffChild() + " - " + fsChild() + " - " + fChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + fffChild() + " - " + fsChild() + " - " + fChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: sfChild() + " - " + sChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + sfChild() + " - " + sChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + sfChild() + " - " + sChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: sffChild() + " - " + sfChild() + " - " + sChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + sffChild() + " - " + sfChild() + " - " + sChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + sffChild() + " - " + sfChild() + " - " + sChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: sffChild() + " - " + ssChild() + " - " + sChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + sffChild() + " - " + ssChild() + " - " + sChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + sffChild() + " - " + ssChild() + " - " + sChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: sfffChild() + " - " + sfChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + sfffChild() + " - " + sfChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + sfffChild() + " - " + sfChild(),
              e.target.value
            );
          }}
        />
      ),
    },
    {
      title: ssffChild() + " - " + ssChild(),
      value: (
        <input
          className="var-inputs"
          type="number"
          min="0"
          max="1"
          step="0.1"
          placeholder={localStorage.getItem(
            "tpValue: " + ssffChild() + " - " + ssChild()
          )}
          onInput={(e) => {
            localStorage.setItem(
              "tpValue: " + ssffChild() + " - " + ssChild(),
              e.target.value
            );
          }}
        />
      ),
    },
  ];

  createTheme("solarized", {
    text: {
      primary: "#000000",
    },
    background: {
      default: "#f7f7f7",
    },
    context: {
      background: "#f7f7f7",
    },
    action: {
      hover: "rgba(0,0,0,0)",
    },
  });

  const tableStyle = {
    head: {
      style: {
        fontSize: "16px",
      },
    },
    headRow: {
      style: {
        borderBottomWidth: "0",
        marginTop: "20px",
        marginBottom: "-10px",
      },
    },
    rows: {
      style: {
        minHeight: "30px",
        "&:not(:last-of-type)": {
          borderBottomWidth: "0",
        },
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        "&:not(:last-of-type)": {
          justifyContent: "flex-start",
          paddingRight: "0",
        },
      },
    },
  };

  return (
    <div className={open ? "collapse-tree" : "table-container"}>
      <div className="table">
        <DataTable
          rdt_TableRow="trow"
          customStyles={tableStyle}
          columns={top}
          data={topData}
          theme="solarized"
        />
      </div>
      <div className="table">
        <DataTable
          rdt_TableRow="trow"
          customStyles={tableStyle}
          columns={columns}
          data={data}
          theme="solarized"
        />
      </div>
      <div className="table">
        <DataTable
          customStyles={tableStyle}
          columns={costColumns}
          data={costData}
          theme="solarized"
        />
        <DataTable
          customStyles={tableStyle}
          columns={edColumns}
          data={edData}
          theme="solarized"
        />
      </div>
    </div>
  );
}
