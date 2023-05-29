import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const MyPDFDocument = ({ id, studentNo, gender, studentNameE, studentNameA }) => {


    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
        },

        section: {
            width: 516,
            margin: '0 auto',
            marginTop: 20,
        },

        borderTop: {
            height: 24,
            width: '100%',
            backgroundColor: '#FF5733'
        },

        hero: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 32,
            backgroundColor: '#f1f1f1'
        },

        heroLeft: {
            display: 'flex',
            flexDirection: 'row',
            gap: 12
        },

        // heroRight: {},
        demoLogo: {
            width: 32,
            height: 32,
            borderRadius: 999,
            backgroundColor: 'red'
        },

        companyDetail: {
            display: 'flex',
            gap: 4
        },

        companyName: {
            fontSize: 16
        },

        companyAddress: {
            fontSize: 16
        },

        companyPhone: {
            fontSize: 16
        },

        headingInvoice: {
            fontSize: 30,
            textTransform: 'uppercase',
            marginTop: 40,
            marginBottom: 28
        },

        dateParent: {
            display: 'flex',
            flexDirection: "column",
            gap: '20'
        },

        dateP: {
            fontSize: 12,
            borderBottom: '1px solid #193451',
            textTransform: 'uppercase',
            padding: '4 0'

        },

        invoiceP: {
            fontSize: 12,
            borderBottom: '1px solid #193451',
            textTransform: 'uppercase',
            padding: '4 0'
        },

        paymentTemsP: {
            fontSize: 10,
            marginTop: 10,
            textAlign: 'right',
        },

        sectionMid: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
        },

        sectionMidLeft: {
            flex: 1
        },

        sectionMidRight: {
            flex: 2
        },

        informationHead: {
            fontSize: 12,
            borderBottom: '1px solid #193451',
            textTransform: 'uppercase',
            padding: '4 0'
        },

        informationP: {
            fontSize: 10
        },

        informationParent: {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 8
        },

        table: {
            display: 'table',
            fontSize: 12,
            width: '100%',
            marginBottom: 10,
            border: '1px solid #ccc',
            marginTop: 30
        },

        tableHeadRow: {
            borderBottom: '1px solid #ccc',
            textAlign: 'center',
            margin: 'auto',
            flexDirection: 'row',
        },
        tableHeadCell: {
            width: '25%',
            padding: 5,
        },

        tableRow: {
            margin: 'auto',
            flexDirection: 'row',
        },

        tableCell: {
            width: '25%',
            borderStyle: 'solid',
            // borderWidth: 1,
            borderColor: '#ccc',
            borderRight: 1,
            padding: 5,
        },
        lastChild: {
            borderRight: 0
        },

        instructionHeadings: {

            fontSize: 12,
            marginRight: 8,
            textTransform: 'capitalize',
            textAlign: 'right'

        },
        instructionParentP: {
            width: 160,
            borderBottom: '1px solid #ccc',
        },

        instructionP: {
            fontSize: 10,
            paddingBottom: '7',
            alignSelf: 'flex-end'

        },
        instructionParent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
        },

        instructionSubParent: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },

        instructionRight: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '7',
            alignSelf: 'flex-end'
        },

        balanceDueP: {
            textTransform: 'capitalize',
            fontSize: 14
        },

        balanceDuePParant: {
            borderBottom: '1px solid #ccc',
            backgroundColor: '#E2FFE7',
            width: 160,
            padding: '7 0'
        },

        balanceMain: {
            borderTop: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10
        },
        borderTopMargin: {
            position: 'absolute',
            bottom: 20
        }


    });


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>

                    <View style={styles.borderTop} />

                    <View style={styles.hero}>

                        <View style={styles.heroLeft}>

                            <View style={styles.demoLogo} />
                            <View style={styles.companyDetail}>
                                <Text style={styles.companyName}>ETI Oman</Text>
                                <Text style={styles.companyAddress}>asdfasdfadsf</Text>
                                <Text style={styles.companyPhone}>+9684545495334</Text>
                            </View>

                        </View>

                        <View style={styles.heroRight}>
                            <Text style={styles.headingInvoice}>Invoice</Text>

                            <View style={styles.dateParent}>
                                <Text style={styles.dateP}>date</Text>
                                <Text style={styles.invoiceP}>invoice no.</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.paymentTemsP}>Payment terms (due to receipt, due in X days)</Text>

                    <View style={styles.sectionMid}>

                        <View style={styles.sectionMidLeft}>

                            <Text style={styles.informationHead}>bill to</Text>
                            <View style={styles.informationParent}>
                                <Text style={styles.informationP}>contact name</Text>
                                <Text style={styles.informationP}>client company name</Text>
                                <Text style={styles.informationP}>address</Text>
                                <Text style={styles.informationP}>phone</Text>
                                <Text style={styles.informationP}>email</Text>
                            </View>
                        </View>

                        <View style={styles.sectionMidRight}>

                            <Text style={styles.informationHead}>ship to</Text>
                            <View style={styles.informationParent}>
                                <Text style={styles.informationP}>name</Text>
                                <Text style={styles.informationP}>client company name</Text>
                                <Text style={styles.informationP}>address</Text>
                                <Text style={styles.informationP}>phone</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.table}>
                        <View style={styles.tableHeadRow}>
                            <View style={styles.tableHeadCell}>
                                <Text>DESCRIPTION</Text>
                            </View>
                            <View style={styles.tableHeadCell}>
                                <Text>QTY</Text>
                            </View>

                            <View style={styles.tableHeadCell}>
                                <Text>UNIT PRICE</Text>
                            </View>

                            <View style={styles.tableHeadCell}>
                                <Text>PRICE</Text>
                            </View>
                        </View>

                        {/* [styles.item, styles.lastChild] */}

                        <View style={styles.tableRow}>
                            <View style={[styles.tableCell]}>
                                <Text>Data 1</Text>
                            </View>
                            <View style={[styles.tableCell]}>
                                <Text>Data 2</Text>
                            </View>
                            <View style={[styles.tableCell]}>
                                <Text>Data 3</Text>
                            </View>

                            <View style={[styles.tableCell, styles.lastChild]}>
                                <Text>Data 3</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.instructionParent}>
                        <Text style={styles.informationP}>Remarks /Payment Instructions:</Text>

                        <View>

                            <View style={styles.instructionRight}>

                                <View style={styles.instructionSubParent}>
                                    <Text style={styles.instructionHeadings}>subtotal</Text>

                                    <View style={styles.instructionParentP}>
                                        <Text style={styles.instructionP}>0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.instructionSubParent}>
                                    <Text style={styles.instructionHeadings}>discount</Text>

                                    <View style={styles.instructionParentP}>
                                        <Text style={[styles.instructionP, styles.marginRRight]}>0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.instructionSubParent}>
                                    <Text style={styles.instructionHeadings}>subtotal{'\n'}less{'\n'}discount</Text>

                                    <View style={styles.instructionParentP}>
                                        <Text style={[styles.instructionP, styles.marginRRight]}>0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.instructionSubParent}>
                                    <Text style={styles.instructionHeadings}>tax rate</Text>

                                    <View style={styles.instructionParentP}>
                                        <Text style={[styles.instructionP, styles.marginRRight]}>0.00%</Text>
                                    </View>
                                </View>

                                <View style={styles.instructionSubParent}>
                                    <Text style={styles.instructionHeadings}>total tax</Text>

                                    <View style={styles.instructionParentP}>
                                        <Text style={[styles.instructionP, styles.marginRRight]}>0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.instructionSubParent}>
                                    <Text style={styles.instructionHeadings}>shipping/{'\n'}handling</Text>

                                    <View style={styles.instructionParentP}>
                                        <Text style={[styles.instructionP, styles.marginRRight]}>0.00</Text>
                                    </View>
                                </View>



                            </View>

                            <View style={styles.balanceMain}>

                                <Text style={styles.balanceDueP}>balance due</Text>
                                <View style={styles.balanceDuePParant}>
                                    <Text style={styles.instructionP}>$ -</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.borderTop, styles.borderTopMargin]} />

                </View>

            </Page>
        </Document>
    )
}

export default MyPDFDocument