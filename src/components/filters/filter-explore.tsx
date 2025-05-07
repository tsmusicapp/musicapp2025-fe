import TabsMenu from "../tabs/tabs-menu";

function FilterExploreComponent() {
  // const dispatch = useDispatch<AppDispatch>();
  // const filterActive = useSelector(
  //   (state: RootState) => state.offer.filterExplore
  // );
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <TabsMenu />
    </div>
  );
}

export default FilterExploreComponent;
