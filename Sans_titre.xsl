<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    xmlns:func="http://umontreal.ca/IFT3225/tp1"
    version="2.0">
    <xsl:template match="/">
        <table>
            <tr>
                <th>Number</th>
                <th>Factorial</th>
            </tr>
        <xsl:for-each select="/nbs/fact">
            <tr>
                <td><xsl:value-of select="."/></td>
                <td><xsl:value-of select="func:fact(.)"/></td>
            </tr>
        </xsl:for-each>
        </table>
    </xsl:template>
    <xsl:function name="func:fact">
        <xsl:param name="value"/>
        <xsl:choose>
            <xsl:when test="$value = 0">
                <xsl:value-of select="1"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="func:fact($value - 1) * $value"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>
</xsl:stylesheet>