import React from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tableColHeader: {
        flex: 1,
        minWidth: '12%', // Adjusts width based on total columns
        padding: 6,
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2',
        borderBottom: '1px solid black',
        textAlign: 'center',
        fontSize: 10,
    },
    tableCol: {
        flex: 1,
        minWidth: '12%',
        padding: 6,
        fontSize: 9,
        textAlign: 'left',
        borderBottom: '1px solid #e0e0e0',
        color: '#333',
        lineHeight: 1.4,
    },
    wrapText: {
        flexWrap: 'wrap',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

function PdfFile({ columns, data }) {
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}>Table Export</Text>
                <View style={styles.table}>
                    {/* Render Table Header */}
                    <View style={styles.tableRow}>
                        {columns.map((col) => (
                            <Text style={styles.tableColHeader} key={col.accessorKey}>
                                {col.header}
                            </Text>
                        ))}
                    </View>
                    {/* Render Table Data */}
                    {data.map((row, rowIndex) => (
                        <View style={styles.tableRow} key={rowIndex}>
                            {columns.map((col) => (
                                <Text style={[styles.tableCol, styles.wrapText]} key={col.accessorKey}>
                                    {row[col.accessorKey]}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                />
            </Page>
        </Document>
    );
}

export default PdfFile;
