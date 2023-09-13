def test_cluster_party_export_omit_none():
    """SFClusterParty should omit listen_addr if it is None."""
    from secretnote.compat.secretflow.device.driver import SFClusterParty

    party = SFClusterParty(address="localhost:7860")
    assert party.export() == {"address": "localhost:7860"}
