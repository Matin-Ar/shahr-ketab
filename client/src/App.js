import logo from "./logo.svg";
import "./App.css";
import Menu from "./Menu";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

function App() {
  const [booksList, setBooksList] = useState([]);
  let [count, setCount] = useState(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddFactor, setShowAddFactor] = useState(false);

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [nevisande, setNevisande] = useState([]);
  const [editbook, setEditBook] = useState(false);

  const [factorList, setFactorList] = useState([]);

  const [selectedTab, setSelectedTab] = useState(1);

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [topic, setTopic] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const [publisher, setPublisher] = useState("");
  const [productcount, setProductCount] = useState("");

  const [description, setDescription] = useState("");

  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cityName, setCityName] = useState("");
  const [province, setProvince] = useState("");

  const [Edittitle, setEditTitle] = useState("");
  const [Editid, setEditid] = useState("");

  const [Editwriter, setEditWriter] = useState("");
  const [Edittopic, setEditTopic] = useState("");
  const [EditpurchasePrice, setEditPurchasePrice] = useState("");

  const [Editpublisher, setEditPublisher] = useState("");
  const [Editproductcount, setEditProductCount] = useState("");

  const [Editdescription, setEditDescription] = useState("");

  const [Editaddress, setEditAddress] = useState("");
  const [Edittelephone, setEditTelephone] = useState("");
  const [EditcityName, setEditCityName] = useState("");
  const [Editprovince, setEditProvince] = useState("");

  const [factorDate, setFactorDate] = useState("");
  const [c_name, setc_name] = useState("");
  const [c_phone, setc_phone] = useState("");
  const [c_address, setc_address] = useState("");

  const [e_name, sete_name] = useState("");
  const [e_phone, sete_phone] = useState("");
  const [gender, setgender] = useState("");

  const [EditFactorMode, setEditFactorMode] = useState(false);
  const [EditfactorDate, setEditFactorDate] = useState("");
  const [Editc_name, setEditc_name] = useState("");
  const [Editc_phone, setEditc_phone] = useState("");
  const [Editc_address, setEditc_address] = useState("");

  const [Edite_name, setEdite_name] = useState("");
  const [Edite_phone, setEdite_phone] = useState("");
  const [Editgender, setEditgender] = useState("");

  const [selectboxCount, setSelectBoxCount] = useState([1]);
  const [sellArr, setSellArr] = useState([{}]);

  useEffect(() => {
    axios
      .get("/api/book")
      .then((res) => {
        setBooksList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/factor")
      .then((res) => {
        setFactorList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    console.log(factorList);
    setCount(booksList.lenght);
  }, [count]);

  const handleDeleteBook = (bookid) => {
    axios
      .delete(`/api/book/${bookid}`)
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));

    forceUpdate();

    setCount(count++);
  };

  const handleDeleteFactor = (factorId) => {
    axios
      .delete(`/api/factor/${factorId}`)
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));

    forceUpdate();

    setCount(count++);
  };

  const handleAddProduct = () => {
    console.log("clicked");
    selectboxCount.push(1);
    sellArr.push({});
    console.log("this is sell arr", sellArr);
    forceUpdate();

    setCount(count++);
  };

  const handleSelection = (value, index) => {
    sellArr[index]._id = value;

    console.log(sellArr);
  };

  const handleChangeCount = (value, index) => {
    sellArr[index].count = value;

    console.log("from count", sellArr);
  };

  const handleChangePrice = (value, index) => {
    sellArr[index].sale_price = value;

    console.log("from price", sellArr);
  };

  const handleAddBook = () => {
    if (
      title &&
      writer &&
      topic &&
      purchasePrice &&
      publisher &&
      productcount &&
      description &&
      address &&
      telephone &&
      cityName &&
      province
    ) {
      const bookdata = {
        title,
        writer,
        topic,
        purchase_pirce: purchasePrice,

        publisher,
        available: { count: productcount, description },
        store: { address, telephone, city: { cityname: cityName, province } },
      };

      axios
        .post(`/api/book/`, bookdata)
        .then((res) => {
          if (res.status === 201) {
            alertify.success("با موفقیت اضافه گردید");
            forceUpdate();

            setCount(count++);
          }
        })
        .catch((err) => alertify.error(err));
    } else {
      alertify.error("لطفا تمامی فیلد ها را وارد نمایید");
    }
  };

  const handleAddFactor = () => {
    if (
      factorDate &&
      c_name &&
      c_phone &&
      c_address &&
      e_name &&
      e_phone &&
      gender
    ) {
      const foodata = {
        date_factor: factorDate,
        customer: {
          c_name,
          c_phone,
          c_address,
        },
        employee: {
          e_name,
          e_phone,
          gender,
        },
        sell: sellArr,
      };

      axios
        .post("/api/factor", foodata)
        .then((res) => {
          if (res.status === 201) {
            alertify.success("با موفقیت اضافه گردید");
            setShowAddFactor(false);
            forceUpdate();

            setCount(count++);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alertify.error("لطفا تمامی فیلد ها را وارد نمایید");
    }
  };

  const handlemyEditBook = (
    _id,
    title,
    writer,
    topic,
    publisher,
    purchase_pirce,
    description,
    province,
    cityname,
    address,
    telephone,
    count
  ) => {
    setEditid(_id);
    setEditTitle(title);
    setEditWriter(writer);
    setEditTopic(topic);
    setEditPurchasePrice(purchase_pirce);
    setEditPublisher(publisher);
    setEditProductCount(parseInt(count));
    setEditDescription(description);
    setEditAddress(address);
    setEditTelephone(telephone);
    setEditCityName(cityname);
    setEditProvince(province);

    setEditBook(true);
  };

  const handlemyEditFactor = () => {
    setEditFactorMode(!EditFactorMode);
    console.log(EditFactorMode);
  };

  const handleEditBook = () => {
    if (
      Edittitle &&
      Editwriter &&
      Edittopic &&
      EditpurchasePrice &&
      Editpublisher &&
      Editproductcount &&
      Editdescription &&
      Editaddress &&
      Edittelephone &&
      EditcityName &&
      Editprovince
    ) {
      const thisdata = {
        title: Edittitle,
        writer: Editwriter,
        topic: Edittopic,
        purchase_pirce: EditpurchasePrice,

        publisher: Editpublisher,
        available: { count: Editproductcount, description: Editdescription },
        store: {
          address: Editaddress,
          telephone: Edittelephone,
          city: { cityname: EditcityName, province: Editprovince },
        },
      };

      console.log();

      axios
        .patch(`/api/book/${Editid}`, thisdata)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alertify.success("با موفقیت ویرایش گردید");
            forceUpdate();

            setCount(count++);
          }
        })
        .catch((err) => alertify.error(err));
    } else {
      alertify.error("لطفا تمامی فیلد ها را وارد نمایید");
    }
  };

  const handleEditFactor = () => {};

  return (
    <>
      <div className="App">
        <Menu setSelectedTab={setSelectedTab} />

        <div className="scroll">
          <div className="main-wrapper">
            {booksList.lenght && <h1>number of books {`${count}`}</h1>}
            {booksList &&
              selectedTab == 1 &&
              booksList.map((book, index) => {
                return (
                  <div className="book-wrapper" key={book._id}>
                    <div className="book-right-info">
                      <div className="book-group">
                        <h2 className="group-label"> عنوان:</h2>
                        <h2 className="group-value">{book.title}</h2>
                      </div>

                      <div className="book-group">
                        {book.writer.map((num, index) => (
                          <>
                            <h2 className="group-label">
                              {" "}
                              نویسنده {index + 1}:
                            </h2>
                            <h2 className="group-value multi">
                              {book.writer[index]}
                            </h2>
                          </>
                        ))}
                      </div>

                      <div className="book-group">
                        <h2 className="group-label"> دسته بندی:</h2>
                        <h2 className="group-value">{book.topic}</h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label"> ناشر:</h2>
                        <h2 className="group-value">{book.publisher}</h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label"> قیمت:</h2>
                        <h2 className="group-value">{book.purchase_pirce}</h2>
                      </div>
                      <div className="book-group">
                        <h2 className="group-label"> توضیحات:</h2>
                        <h2 className="group-value">
                          {book.available.description}
                        </h2>
                      </div>
                      <div className="book-group">
                        <h2 className="group-label">استان موجود:</h2>
                        <h2 className="group-value">
                          {book.store.city.province}
                        </h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label">شهر موجود:</h2>
                        <h2 className="group-value">
                          {book.store.city.cityname}
                        </h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label">آدرس شعبه:</h2>
                        <h2 className="group-value">{book.store.address}</h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label"> شماره شعبه:</h2>
                        <h2 className="group-value">{book.store.telephone}</h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label"> تعداد موجودی:</h2>
                        <h2 className="group-value">{book.available.count}</h2>
                      </div>
                    </div>
                    <div className="actions-div">
                      <button
                        className="button red"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        حذف
                      </button>
                      <button
                        className="button yellow"
                        onClick={() =>
                          handlemyEditBook(
                            book._id,
                            book.title,
                            book.writer,
                            book.topic,
                            book.publisher,
                            book.purchase_pirce,
                            book.available.description,
                            book.store.city.province,
                            book.store.city.cityname,
                            book.store.address,
                            book.store.telephone,
                            book.available.count
                          )
                        }
                      >
                        ویرایش
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="add-book-btn-wrapper">
            {" "}
            {!editbook && selectedTab == 1 && (
              <button
                className={`add-book-btn ${!showAddBook ? "greena" : "reda"}`}
                onClick={() => setShowAddBook(!showAddBook)}
              >
                {!showAddBook ? "افزودن کتاب" : "بستن پنجره"}
              </button>
            )}
            {editbook && !showAddBook && (
              <button
                className={`add-book-btn ${!showAddBook ? "greena" : "reda"}`}
                onClick={() => setEditBook(!editbook)}
              >
                {!editbook ? "ویرایش کتاب" : " بستن پنجره ویرایش"}
              </button>
            )}
          </div>
          <div className={`add-book-wrapper ${showAddBook ? "show" : "hide"}`}>
            <div className="add-book-input-group">
              <label className="add-book-input-label">
                عنوان
                <input
                  type="text"
                  className="add-book-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                نویسنده
                <input
                  type="text"
                  className="add-book-input"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                  placeHolder="برای وارد نمودن بیش از یک نویسنده آنها را با ، جدا نمایید برای مثال رضا، علی ، محمد"
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                دسته بندی
                <input
                  type="text"
                  className="add-book-input"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeHolder="برای وارد نمودن بیش از یک دسته بندی آنها را با ، جدا نمایید برای مثال ریاضی ، فیزیک ، شیمی"
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                قیمت خرید
                <input
                  type="text"
                  className="add-book-input"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                ناشر
                <input
                  type="text"
                  className="add-book-input"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                تعداد
                <input
                  type="number"
                  className="add-book-input"
                  value={productcount}
                  onChange={(e) => setProductCount(e.target.value)}
                  placeHolder="فقط عدد میتوان وارد نمود"
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                توضیحات
                <input
                  type="text"
                  className="add-book-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                آدرس
                <input
                  type="text"
                  className="add-book-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                تلفن
                <input
                  type="text"
                  className="add-book-input"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                نام شهر
                <input
                  type="text"
                  className="add-book-input"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />
              </label>
            </div>

            <div className="add-book-input-group">
              <label className="add-book-input-label">
                نام استان
                <input
                  type="text"
                  className="add-book-input"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </label>
            </div>

            <button className="sendbtn" onClick={handleAddBook}>
              ارسال کتاب به دیتابیس
            </button>
          </div>

          {editbook && (
            <div className={`add-book-wrapper ${editbook ? "show" : "hide"}`}>
              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  عنوان
                  <input
                    type="text"
                    className="add-book-input"
                    value={Edittitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  نویسنده
                  <input
                    type="text"
                    className="add-book-input"
                    value={Editwriter}
                    onChange={(e) => setEditWriter(e.target.value)}
                    placeHolder="برای وارد نمودن بیش از یک نویسنده آنها را با ، جدا نمایید برای مثال رضا، علی ، محمد"
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  دسته بندی
                  <input
                    type="text"
                    className="add-book-input"
                    value={Edittopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    placeHolder="برای وارد نمودن بیش از یک دسته بندی آنها را با ، جدا نمایید برای مثال ریاضی ، فیزیک ، شیمی"
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  قیمت خرید
                  <input
                    type="text"
                    className="add-book-input"
                    value={EditpurchasePrice}
                    onChange={(e) => setEditPurchasePrice(e.target.value)}
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  ناشر
                  <input
                    type="text"
                    className="add-book-input"
                    value={Editpublisher}
                    onChange={(e) => setEditPublisher(e.target.value)}
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  تعداد
                  <input
                    type="number"
                    className="add-book-input"
                    value={Editproductcount}
                    onChange={(e) => setEditProductCount(e.target.value)}
                    placeHolder="فقط عدد میتوان وارد نمود"
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  توضیحات
                  <input
                    type="text"
                    className="add-book-input"
                    value={Editdescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  آدرس
                  <input
                    type="text"
                    className="add-book-input"
                    value={Editaddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  تلفن
                  <input
                    type="text"
                    className="add-book-input"
                    value={Edittelephone}
                    onChange={(e) => setEditTelephone(e.target.value)}
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  نام شهر
                  <input
                    type="text"
                    className="add-book-input"
                    value={EditcityName}
                    onChange={(e) => setEditCityName(e.target.value)}
                  />
                </label>
              </div>

              <div className="add-book-input-group">
                <label className="add-book-input-label">
                  نام استان
                  <input
                    type="text"
                    className="add-book-input"
                    value={Editprovince}
                    onChange={(e) => setEditProvince(e.target.value)}
                  />
                </label>
              </div>

              <button className="sendbtn" onClick={handleEditBook}>
                ویرایش کتاب
              </button>
            </div>
          )}

          {/*factor page*/}
          {selectedTab == 2 && (
            <div>
              {factorList &&
                factorList.map((factor) => {
                  return (
                    <div className="factor-group-wrapper">
                      <div className="actions-div">
                        <button
                          className="button red"
                          onClick={() => handleDeleteFactor(factor._id)}
                        >
                          حذف
                        </button>
                        <button
                          className="button yellow"
                          onClick={handlemyEditFactor}
                        >
                          ویرایش
                        </button>
                      </div>

                      <h1 className="factor-title">
                        اطلاعات شماره فاکتور {`${factor._id}`}
                      </h1>
                      <hr className="factor-hr" />
                      <h1 className="factor-title">
                        تاریخ فاکتور {`${factor.date_factor}`}
                      </h1>

                      <h1 className="factor-title">اطلاعات مشتری</h1>
                      <div className="book-group">
                        <h2 className="group-label">نام مشتری</h2>
                        <h2 className="group-value">
                          {factor.customer.c_name}
                        </h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label">آدرس مشتری</h2>
                        <h2 className="group-value">
                          {factor.customer.c_address}
                        </h2>
                      </div>

                      <h1 className="factor-title">اطلاعات کارمند</h1>

                      <div className="book-group">
                        <h2 className="group-label">نام کارمند</h2>
                        {factor.employee.e_name}
                      </div>

                      <div className="book-group">
                        <h2 className="group-label">شماره کارمند</h2>
                        <h2 className="group-value">
                          {factor.employee.e_phone}
                        </h2>
                      </div>

                      <div className="book-group">
                        <h2 className="group-label">جنسیت کارمند</h2>
                        <h2 className="group-value">
                          {factor.employee.gender}
                        </h2>
                      </div>

                      <h1 className="factor-title">اطلاعات فروش</h1>

                      <div className="book-group">
                        <h2 className="group-label">فروش</h2>
                        <h2 className="group-value">
                          {factor.sell?.map((item) => {
                            return (
                              <div>{`تعداد ${item.count} عدد از محصول با شماره آیدی ${item._id} و به قیمت ${item.sale_price} فروخته شد  `}</div>
                            );
                          })}
                        </h2>
                      </div>

                      <div className="add-book-btn-wrapper">
                        {" "}
                        {selectedTab == 2 && (
                          <button
                            className={`add-book-btn ${
                              !showAddFactor ? "greena" : "reda"
                            }`}
                            onClick={() => setShowAddFactor(!showAddFactor)}
                          >
                            {!showAddFactor ? "افزودن فاکتور" : "بستن پنجره"}
                          </button>
                        )}
                        {editbook && !showAddBook && (
                          <button
                            className={`add-book-btn ${
                              !showAddBook ? "greena" : "reda"
                            }`}
                            onClick={() => setEditBook(!editbook)}
                          >
                            {!editbook ? "ویرایش کتاب" : " بستن پنجره ویرایش"}
                          </button>
                        )}
                      </div>
                      {selectedTab == 2 && !EditFactorMode && (
                        <div
                          className={`add-factor-wrapper ${
                            EditFactorMode ? "show" : "hide"
                          }`}
                        >
                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              تاریخ فاکتور
                              <input
                                type="text"
                                className="add-book-input"
                                value={factorDate}
                                onChange={(e) => setFactorDate(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              نام مشتری
                              <input
                                type="text"
                                className="add-book-input"
                                value={c_name}
                                onChange={(e) => setc_name(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              شماره همراه مشتری
                              <input
                                type="text"
                                className="add-book-input"
                                value={c_phone}
                                onChange={(e) => setc_phone(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              آدرس مشتری
                              <input
                                type="text"
                                className="add-book-input"
                                value={c_address}
                                onChange={(e) => setc_address(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              نام کارمند
                              <input
                                type="text"
                                className="add-book-input"
                                value={e_name}
                                onChange={(e) => sete_name(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              شماره همراه کارمند
                              <input
                                type="number"
                                className="add-book-input"
                                value={e_phone}
                                onChange={(e) => sete_phone(e.target.value)}
                                placeHolder="فقط عدد میتوان وارد نمود"
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              جنسیت
                              <input
                                type="text"
                                className="add-book-input"
                                value={gender}
                                onChange={(e) => setgender(e.target.value)}
                              />
                            </label>
                          </div>

                          <hr />

                          <div className="factor-sell-wrapper">
                            <h6 className="factor-sell-title">
                              محصولات فروخته شده
                            </h6>

                            {selectboxCount?.map((box, index) => {
                              return (
                                <div className="mywrapper">
                                  <select
                                    name="books"
                                    id="books"
                                    onChange={(e) =>
                                      handleSelection(e.target.value, index)
                                    }
                                  >
                                    {booksList.map((book) => {
                                      return (
                                        <option value={book._id}>
                                          {book.title}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <div className="add-book-input-group">
                                    <label className="add-book-input-label">
                                      قیمت فروش
                                      <input
                                        type="text"
                                        className="add-book-input"
                                        value={sellArr[index].sale_price}
                                        onChange={(e) =>
                                          handleChangePrice(
                                            e.target.value,
                                            index
                                          )
                                        }
                                      />
                                    </label>
                                  </div>

                                  <div className="add-book-input-group">
                                    <label className="add-book-input-label">
                                      تعداد فروش
                                      <input
                                        type="text"
                                        className="add-book-input"
                                        value={sellArr[index].count}
                                        onChange={(e) =>
                                          handleChangeCount(
                                            e.target.value,
                                            index
                                          )
                                        }
                                      />
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <button
                            onClick={handleAddProduct}
                            className="button btnb"
                          >
                            افزودن محصول جدید
                          </button>

                          <button className="sendbtn" onClick={handleAddFactor}>
                            ارسال فاکتور به دیتابیس
                          </button>
                        </div>
                      )}

                      {selectedTab == 2 && (
                        <div
                          className={`add-factor-wrapper ${
                            EditFactorMode ? "show" : "hide"
                          }`}
                        >
                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              تاریخ فاکتور
                              <input
                                type="text"
                                className="add-book-input"
                                value={EditfactorDate}
                                onChange={(e) =>
                                  setEditFactorDate(e.target.value)
                                }
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              نام مشتری
                              <input
                                type="text"
                                className="add-book-input"
                                value={Editc_name}
                                onChange={(e) => setEditc_name(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              شماره همراه مشتری
                              <input
                                type="text"
                                className="add-book-input"
                                value={Editc_phone}
                                onChange={(e) => setEditc_phone(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              آدرس مشتری
                              <input
                                type="text"
                                className="add-book-input"
                                value={Editc_address}
                                onChange={(e) =>
                                  setEditc_address(e.target.value)
                                }
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              نام کارمند
                              <input
                                type="text"
                                className="add-book-input"
                                value={Edite_name}
                                onChange={(e) => setEdite_name(e.target.value)}
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              شماره همراه کارمند
                              <input
                                type="number"
                                className="add-book-input"
                                value={Edite_phone}
                                onChange={(e) => setEdite_phone(e.target.value)}
                                placeHolder="فقط عدد میتوان وارد نمود"
                              />
                            </label>
                          </div>

                          <div className="add-book-input-group">
                            <label className="add-book-input-label">
                              جنسیت
                              <input
                                type="text"
                                className="add-book-input"
                                value={Editgender}
                                onChange={(e) => setEditgender(e.target.value)}
                              />
                            </label>
                          </div>

                          <hr />

                          <div className="factor-sell-wrapper">
                            <h6 className="factor-sell-title">
                              محصولات فروخته شده
                            </h6>

                            {selectboxCount?.map((box, index) => {
                              return (
                                <div className="mywrapper">
                                  <select
                                    name="books"
                                    id="books"
                                    onChange={(e) =>
                                      handleSelection(e.target.value, index)
                                    }
                                  >
                                    {booksList.map((book) => {
                                      return (
                                        <option value={book._id}>
                                          {book.title}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <div className="add-book-input-group">
                                    <label className="add-book-input-label">
                                      قیمت فروش
                                      <input
                                        type="text"
                                        className="add-book-input"
                                        value={sellArr[index].sale_price}
                                        onChange={(e) =>
                                          handleChangePrice(
                                            e.target.value,
                                            index
                                          )
                                        }
                                      />
                                    </label>
                                  </div>

                                  <div className="add-book-input-group">
                                    <label className="add-book-input-label">
                                      تعداد فروش
                                      <input
                                        type="text"
                                        className="add-book-input"
                                        value={sellArr[index].count}
                                        onChange={(e) =>
                                          handleChangeCount(
                                            e.target.value,
                                            index
                                          )
                                        }
                                      />
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <button
                            onClick={handleAddProduct}
                            className="button btnb"
                          >
                            افزودن محصول جدید
                          </button>

                          <button className="sendbtn" onClick={handleAddFactor}>
                            ارسال فاکتور به دیتابیس
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
