import React from "react";
import { categories } from "../../utils/categories";
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
} from "./styles";

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: CategoryProps;
  date: string;
  type: "positive" | "negative";
}
interface Props {
  data: TransactionCardProps;
}
export function TransactionCard({data}: Props): JSX.Element {
  // const [category] = categories.filter((item) => item.key === data.category);
  return (
    <Container>
     <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
