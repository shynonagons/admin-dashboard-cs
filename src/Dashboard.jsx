import React from "react";
import moment from "moment";
import { Table } from "./components/Table";
import { UserSpendChart } from "./UserSpendChart";
import { Logo } from "./Logo";
import { DetailModal } from "./DetailModal";
import { DataBlock } from "./components/DataBlock";
import { FilterDropdown } from "./components/FilterDropdown";
import ApproveDeny from "./ApproveDeny";
import { Header, Grid, Button, Tabs, Tab, Box, Select } from "grommet";
import { Logout } from "grommet-icons";
import styled from "styled-components";

const DashboardContainer = styled(Box)`
  background: #f2f2f2;
`;

export const Dashboard = ({
  logo,
  companyName,
  totalSpend,
  spendRemaining,
  userData,
  userHeaders,
  userSpendData,
  totalOrders,
  productsPurchased,
  chartData,
  tooltipContent,
  headers,
  tableData,
  modalTitle,
  modalData,
  userDetails,
  showModal,
  openModal,
  closeModal,
  filter,
  approve,
  orderData,
  dropdownItems,
  handleFilter,
  year,
  handleYear,
  approveOrDenyOrders,
  setActiveOrder,
  logout
}) => {
  const formattedYear = moment.isMoment(year)
    ? moment(year).format("YYYY")
    : year;
  const yearSelect = (
    <Select
      style={{ width: "200px" }}
      value={formattedYear}
      onChange={e => handleYear(e.target.value)}
      options={["all", 2020, 2019, 2018]}
      placeholder="select"
    />
  );
  // const activeKey = orderData.length > 0 ? 2 : 1;
  return (
    <Grid>
      <Header>
        <h1>{logo ? <Logo logo={logo} /> : { companyName }}</h1>
        <Button icon={<Logout />} onClick={logout} />
      </Header>
      <DashboardContainer>
        <Box>
          <p>Filter by Year:</p>
          {yearSelect}
          <Tabs id="qm-tabs" style={{ marginTop: "20px" }}>
            <Tab title="Summary">
              {userData && (
                <div>
                  <Box>
                    <Box direction="row" align="center">
                      <Box direction="row" wrap={true} justify="center">
                        {totalSpend}
                        {spendRemaining}
                        {totalOrders}
                        {productsPurchased}
                      </Box>
                      <UserSpendChart
                        chartData={chartData}
                        tooltipContent={tooltipContent}
                      />
                    </Box>
                  </Box>
                  {filter && (
                    <FilterDropdown
                      filter={filter}
                      dropdownItems={dropdownItems}
                      handleFilter={handleFilter}
                    />
                  )}
                  <Table headers={userHeaders} tableData={userSpendData} />
                  <Table headers={headers} tableData={tableData} />
                  <DetailModal
                    modalTitle={modalTitle}
                    modalData={modalData}
                    userDetails={userDetails}
                    showModal={showModal}
                    openModal={openModal}
                    closeModal={closeModal}
                  />
                </div>
              )}
            </Tab>
            {approve && (
              <Tab title="Approve/Deny Orders">
                <ApproveDeny
                  data={orderData}
                  approveOrDenyOrders={approveOrDenyOrders}
                  modalTitle={modalTitle}
                  modalData={modalData}
                  userDetails={userDetails}
                  openModal={openModal}
                  closeModal={closeModal}
                  showModal={showModal}
                  setActiveOrder={setActiveOrder}
                />
              </Tab>
            )}
          </Tabs>
        </Box>
      </DashboardContainer>
    </Grid>
  );
};
