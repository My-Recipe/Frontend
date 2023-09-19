import { Stack, Typography } from '@base';
import InputBox from '@copmonents/InputBox';
import Recipe from '@copmonents/Recipe';
import { TagDataType } from '@copmonents/Tag';
import { useState } from 'react';
const RECIPE_ITEMS = [
  {
    name: '게살 버거',
    author: '스펀지밥',
    img: 'https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=1600&h=1066&q=medium',
    contents:
      '소스 : 마요네즈, 케챱, 머스타드 패티 : 게살, 새우 기타 재료 : 햄버거빵, 양상추, 토마토, 양파 햄버거 빵을 굽고 패티를 다져서 맛있게 만들어요.',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '카레우동',
    author: '초코보이',
    contents:
      '카레 : 양파, 당근, 감자, 카레가루, 닭고기 또는 소고기 기타 재료 : 우동면 양파를 열심히 캬라멜라이징하고 카레가루를 넣고 끓여서 우동에 넣고 맛있게 먹어요~',
  },
  {
    name: '간장게장',
    author: '할머니',
    contents:
      '맛간장 : 간장, 미림, 설탕, 청양고추, 양파 메인 재료: 꽃게 간장 재료를 다 섞고 꽃게를 통째로 넣어서 3일동안 숙성시켜요. 밥도둑!!',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
  {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  },
];
const INGREDIENT = [
  { value: '양파', label: '양파' },
  { value: '토마토', label: '토마토' },
  { value: '피망', label: '피망' },
  { value: '베이컨', label: '베이컨' },
];

function Search() {
  const [, setSearchValue] = useState<string | string[]>('');
  const onChange = (inputValue: string | TagDataType[]) => {
    if (typeof inputValue === 'string') setSearchValue(inputValue);
    else {
      setSearchValue(inputValue.map((item) => item.value));
    }
  };

  return (
    <Stack>
      <Stack css={{ gap: 36, margin: '95px 0 124px 0' }}>
        <Typography variant="headline" css={{ alignSelf: 'center' }}>
          레시피 서치하기
        </Typography>
        <InputBox tags={INGREDIENT} onChange={onChange} centerdTags />
      </Stack>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '67px 15px',
          alignSelf: 'center',
        }}
      >
        {RECIPE_ITEMS.map((recipe, idx) => {
          return (
            <Recipe {...recipe} key={`${idx}-${recipe.name}-search`}></Recipe>
          );
        })}
      </div>
    </Stack>
  );
}

export default Search;
