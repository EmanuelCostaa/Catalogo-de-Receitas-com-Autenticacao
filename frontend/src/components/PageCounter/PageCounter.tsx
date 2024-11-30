import SelectInput from "../SelectInput/SelectInput";

type PageCounterProps = {
  page: number;
  maxPage: number;
  pageSize: number;
  changePage: (page: number) => void;
  changePageSize: (pages: number) => void;
};

export default function PageCounter({
  page,
  maxPage,
  pageSize,
  changePage,
  changePageSize,
}: PageCounterProps) {
  return (
    <div className="flex flex-col flex-wrap items-center text-2xl p-10 gap-10 w-full">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <p className="text-2xl">
          Página {page} de {maxPage}
        </p>
        <SelectInput
          onSelect={(select) => changePageSize(select)}
          value={pageSize}
          label="Receitas por página"
          options={[
            { label: "5", value: 5 },
            { label: "10", value: 10 },
            { label: "20", value: 20 },
          ]}
        />
      </div>
      <div className="flex justify-between w-full">
        <button
          disabled={page === 1}
          onClick={() => page > 1 && changePage(+page - 1)}
        >
          {"< "} Anterior
        </button>
        <button
          disabled={page === maxPage}
          onClick={() => page < maxPage && changePage(+page + 1)}
        >
          Próxima {" >"}
        </button>
      </div>
    </div>
  );
}
