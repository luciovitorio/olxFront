import React, { useState, useEffect } from "react";
import { PageArea, SearchArea } from "./styled";
import useAPI from "../../helpers/OlxAPI";
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem";
import { Link } from "react-router-dom";

const Page = () => {
  const api = useAPI();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  useEffect(() => {
    const getState = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getState();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8,
      });
      setAdList(json.ads);
    };
    getRecentAds();
  }, []);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="get" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((i, k) => (
                  <option key={k} value="{i.name}">
                    {i.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((i, k) => (
              <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                <img src={i.img} alt="" />
                <span>{i.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios recentes</h2>
          <div className="list">
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver todos
          </Link>
          <hr />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
          accusantium accusamus quos, dicta animi quaerat laborum cumque eius
          iure consequatur maxime ratione quidem reprehenderit in at voluptatum
          sequi placeat ipsa? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Alias quia doloribus soluta nesciunt reiciendis
          architecto, totam laboriosam omnis odit magnam ipsum perspiciatis sint
          possimus quaerat recusandae fugiat pariatur, commodi atque.
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
