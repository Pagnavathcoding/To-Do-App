import React from 'react';
import { useEffect, useState } from 'react';
import "./index.css";
function local() {
    const data = localStorage.getItem("items");
    if (data) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}
function App() {
    const [value, setValue] = useState("");
    const [data, setData] = useState(local());
    function handleChange(e) {
        setValue(e.target.value);
    }
    function dateInfos() {
        const date = new Date();
        const day = date.getDate();
        let month = date.getMonth();
        const year = date.getFullYear();
        switch (month) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
        }
        return `${day}, ${month} ${year}`;
    }
    function enterSubmit(e) {
        if (e.key === "Enter") {
            if (value === "") return;
            setData([{ id: Date.now(), text: value, done: false, date: dateInfos() }, ...data]);
            setValue("");
        }
    }
    function deleteItem(id) {
        const infos = data.filter((data) => {
            return data.id !== id;
        })
        setData(infos);
    }
    function deleteAll() {
        setData([]);
    }
    function completed(id) {
        setData(data.map((data) => {
            return data.id === id ? { ...data, done: !data.done } : data;
        }))
    }
    function handleSubmit() {
        if (value === "") return;
        setData([{ id: Date.now(), text: value, done: false, date: dateInfos() }, ...data]);
        setValue("");
    }
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(data));
    }, [data])
    return (
        <main>
            <header>
                <h1>To Do App</h1>
                <div className="todos">
                    <input type="text" placeholder="Enter..." value={value} onChange={handleChange} onKeyPress={enterSubmit} />
                    <button onClick={handleSubmit}>Add</button>
                </div>
                <div className="count">
                    <h1>Items: {data.length === 0 ? "Empty" : data.length < 10 ? "0" + data.length : data.length}<span style={{ display: data.length > 0 ? "flex" : "none" }}> completed: {data.filter((data) => {
                        return data.done === true;
                    }).length < 10 ? "0" + data.filter((data) => {
                        return data.done === true;
                    }).length : data.filter((data) => {
                        return data.done === true;
                    }).length}/{data.length < 10 ? "0" + data.length : data.length}</span></h1>
                    <button style={{ display: data.length > 0 ? "block" : "none" }} onClick={deleteAll}>delete all ({data.length < 10 ? "0" + data.length : data.length})</button>
                </div>
            </header>
            <div className="items">
                {
                    data.map((data) => {
                        return (
                            <div key={data.id} className="item" style={{ background: data.done === true ? "#61dafb" : "", color: data.done === true ? "#000" : "#fff" }}>
                                <div className="list">
                                    <li>{data.text}</li>
                                    <p style={{ color: data.done === true ? "#555" : "" }}>{data.date}</p>
                                </div>
                                <div className="btn">
                                    <button onClick={() => completed(data.id)}>{data.done === true ? "completed" : "complete"}</button>
                                    <button onClick={() => deleteItem(data.id)}>delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <footer style={{ display: data.length > 0 ? "block" : "none" }}>
                <p>&copy; made by <a href="https://github.com/Pagnavathcoding">Pagnavath</a>.</p>
            </footer>
        </main>
    )
}
export default App;